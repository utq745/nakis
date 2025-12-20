// Wilcom PDF Parser Utility
// Extracts embroidery design data from Wilcom PDF exports

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { execSync } from 'child_process';
import type { Browser } from 'puppeteer';

// Extract text from PDF using Python/PyMuPDF
async function extractTextFromPdf(pdfPath: string): Promise<string> {
    const { writeFileSync, unlinkSync, existsSync } = await import('fs');
    const { tmpdir } = await import('os');
    const tempScriptPath = join(tmpdir(), `pdf_extract_${Date.now()}.py`);

    const pythonScript = `
import fitz
import sys

pdf_path = sys.argv[1]
doc = fitz.open(pdf_path)
full_text = ""
for page in doc:
    full_text += page.get_text() + "\\n"
print(full_text)
`;

    try {
        // Write the Python script to a temp file
        writeFileSync(tempScriptPath, pythonScript);

        // Execute the script with the PDF path as argument
        const result = execSync(`python3 "${tempScriptPath}" "${pdfPath}"`, {
            encoding: 'utf-8',
            maxBuffer: 50 * 1024 * 1024,
        });

        // Clean up temp file
        if (existsSync(tempScriptPath)) {
            unlinkSync(tempScriptPath);
        }

        return result;
    } catch (error) {
        console.error('Python extraction failed:', error);
        // Clean up temp file on error
        try {
            if (existsSync(tempScriptPath)) {
                unlinkSync(tempScriptPath);
            }
        } catch { }
        return '';
    }
}




// Color mapping for Wilcom default chart
const WILCOM_COLOR_MAP: Record<string, { name: string; hex: string }> = {
    '1': { name: 'Dark Green', hex: '#006400' },
    '2': { name: 'Green', hex: '#008000' },
    '3': { name: 'Lime', hex: '#00FF00' },
    '4': { name: 'Yellow', hex: '#FFFF00' },
    '5': { name: 'Orange', hex: '#FFA500' },
    '6': { name: 'Red', hex: '#FF0000' },
    '7': { name: 'Pink', hex: '#FFC0CB' },
    '8': { name: 'Dark Blue', hex: '#00008B' },
    '9': { name: 'Blue', hex: '#0000FF' },
    '10': { name: 'Orange', hex: '#FFA500' },
    '11': { name: 'Purple', hex: '#800080' },
    '12': { name: 'Brown', hex: '#8B4513' },
    '13': { name: 'White', hex: '#FFFFFF' },
    '14': { name: 'Light Gray', hex: '#D3D3D3' },
    '15': { name: 'Gray', hex: '#808080' },
    '16': { name: 'Dark Gray', hex: '#404040' },
    '17': { name: 'Black', hex: '#000000' },
};

export interface WilcomColor {
    code: string;
    name: string;
    hex: string;
    stitches: number;
    threadUsedM: number;
    chart: string;
}

export interface WilcomColorSequenceItem {
    stop: number;
    colorCode: string;
    colorName: string;
    hex: string;
    stitches: number;
    threadUsedM: number;
}

export interface WilcomParsedData {
    // Design Info
    designName: string;
    title: string | null;
    heightMm: number;
    widthMm: number;
    stitchCount: number;
    colorCount: number;
    colorway: string | null;

    // Machine Info
    machineFormat: string | null;
    machineRuntime: string | null;
    colorChanges: number | null;
    stops: number | null;
    trims: number | null;
    maxStitchMm: number | null;
    minStitchMm: number | null;
    maxJumpMm: number | null;
    totalThreadM: number | null;
    totalBobbinM: number | null;

    // Hoop/Position Info
    leftMm: number | null;
    rightMm: number | null;
    upMm: number | null;
    downMm: number | null;
    areaMm2: number | null;

    // Colors
    colors: WilcomColor[];
    colorSequence: WilcomColorSequenceItem[];

    // Metadata
    designLastSaved: Date | null;
    datePrinted: Date | null;
}

function parseNumber(value: string | undefined): number | null {
    if (!value) return null;
    // Remove units and parse - handle both dot and comma as decimal separator
    const cleaned = value.replace(/[^\d.,\-]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}

function parseDate(dateStr: string | undefined): Date | null {
    if (!dateStr) return null;
    // Format: "14.12.2025 18:39:03"
    const match = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2}):(\d{2})/);
    if (!match) return null;
    const [, day, month, year, hour, minute, second] = match;
    return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
    );
}

function getColorInfo(code: string, name?: string): { name: string; hex: string } {
    const mapped = WILCOM_COLOR_MAP[code];
    if (mapped) return mapped;

    // Use provided name if available
    if (name) {
        // Try to find a matching color by name
        const byName = Object.values(WILCOM_COLOR_MAP).find(
            c => c.name.toLowerCase() === name.toLowerCase()
        );
        if (byName) return byName;
        return { name, hex: '#888888' };
    }

    return { name: `Color ${code}`, hex: '#888888' };
}

export async function parseWilcomPdf(pdfPath: string): Promise<WilcomParsedData> {
    const text = await extractTextFromPdf(pdfPath);

    // Split into pages
    const pages = text.split(/Page \d+ of \d+/);

    // Initialize result
    const result: WilcomParsedData = {
        designName: '',
        title: null,
        heightMm: 0,
        widthMm: 0,
        stitchCount: 0,
        colorCount: 0,
        colorway: null,
        machineFormat: null,
        machineRuntime: null,
        colorChanges: null,
        stops: null,
        trims: null,
        maxStitchMm: null,
        minStitchMm: null,
        maxJumpMm: null,
        totalThreadM: null,
        totalBobbinM: null,
        leftMm: null,
        rightMm: null,
        upMm: null,
        downMm: null,
        areaMm2: null,
        colors: [],
        colorSequence: [],
        designLastSaved: null,
        datePrinted: null,
    };

    // Parse design name
    const designMatch = text.match(/Design:\s*(\S+)/);
    if (designMatch) result.designName = designMatch[1];

    // Parse dimensions
    const heightMatch = text.match(/Height:\s*([\d.,]+)\s*mm/);
    if (heightMatch) result.heightMm = parseNumber(heightMatch[1]) || 0;

    const widthMatch = text.match(/Width:\s*([\d.,]+)\s*mm/);
    if (widthMatch) result.widthMm = parseNumber(widthMatch[1]) || 0;

    // Parse stitch count
    const stitchMatch = text.match(/Stitches?:\s*([\d.,]+)/);
    if (stitchMatch) result.stitchCount = parseInt(stitchMatch[1].replace(/[.,]/g, '')) || 0;

    // Parse color count
    const colorCountMatch = text.match(/Colors:\s*(\d+)/);
    if (colorCountMatch) result.colorCount = parseInt(colorCountMatch[1]) || 0;

    // Parse colorway
    const colorwayMatch = text.match(/Colorway:\s*(.+)/);
    if (colorwayMatch) result.colorway = colorwayMatch[1].trim();

    // Parse machine format
    const machineFormatMatch = text.match(/Machine format:\s*(\S+)/);
    if (machineFormatMatch) result.machineFormat = machineFormatMatch[1];

    // Parse machine runtime - format can be multi-line:
    // Machine runtime:
    // Machine
    // Runtime (hr:min:sec)
    // Machine-1
    // 0:36:03
    // Try different patterns
    let runtimeMatch = text.match(/Runtime[^:]*:\s*([\d:]+)/);
    if (!runtimeMatch) {
        // Try to find time format like "0:36:03" after "Machine-1" or similar
        runtimeMatch = text.match(/Machine-\d+\s+([\d]+:[\d]+:[\d]+)/);
    }
    if (!runtimeMatch) {
        // Just look for time format h:mm:ss anywhere
        const timePatterns = text.match(/(\d{1,2}:\d{2}:\d{2})/g);
        if (timePatterns && timePatterns.length > 0) {
            // Take the first one that looks like a runtime (not a date)
            for (const tp of timePatterns) {
                const parts = tp.split(':');
                if (parts.length === 3) {
                    runtimeMatch = [tp, tp];
                    break;
                }
            }
        }
    }
    if (runtimeMatch) result.machineRuntime = runtimeMatch[1];

    // Parse other machine info
    const colorChangesMatch = text.match(/Color changes:\s*(\d+)/);
    if (colorChangesMatch) result.colorChanges = parseInt(colorChangesMatch[1]);

    const stopsMatch = text.match(/Stops:\s*(\d+)/);
    if (stopsMatch) result.stops = parseInt(stopsMatch[1]);

    const trimsMatch = text.match(/Trims:\s*(\d+)/);
    if (trimsMatch) result.trims = parseInt(trimsMatch[1]);

    const maxStitchMatch = text.match(/Max stitch:\s*([\d.,]+)\s*mm/);
    if (maxStitchMatch) result.maxStitchMm = parseNumber(maxStitchMatch[1]);

    const minStitchMatch = text.match(/Min stitch:\s*([\d.,]+)\s*mm/);
    if (minStitchMatch) result.minStitchMm = parseNumber(minStitchMatch[1]);

    const maxJumpMatch = text.match(/Max jump:\s*([\d.,]+)\s*mm/);
    if (maxJumpMatch) result.maxJumpMm = parseNumber(maxJumpMatch[1]);

    const totalThreadMatch = text.match(/Total thread:\s*([\d.,]+)m/);
    if (totalThreadMatch) result.totalThreadM = parseNumber(totalThreadMatch[1]);

    const totalBobbinMatch = text.match(/Total bobbin:\s*([\d.,]+)m/);
    if (totalBobbinMatch) result.totalBobbinM = parseNumber(totalBobbinMatch[1]);

    // Parse position info
    const leftMatch = text.match(/Left:\s*([\d.,]+)\s*mm/);
    if (leftMatch) result.leftMm = parseNumber(leftMatch[1]);

    const rightMatch = text.match(/Right:\s*([\d.,]+)\s*mm/);
    if (rightMatch) result.rightMm = parseNumber(rightMatch[1]);

    const upMatch = text.match(/Up:\s*([\d.,]+)\s*mm/);
    if (upMatch) result.upMm = parseNumber(upMatch[1]);

    const downMatch = text.match(/Down:\s*([\d.,]+)\s*mm/);
    if (downMatch) result.downMm = parseNumber(downMatch[1]);

    const areaMatch = text.match(/Area\s*([\d.,]+)\s*mm/);
    if (areaMatch) result.areaMm2 = parseNumber(areaMatch[1]);

    // Parse dates
    const lastSavedMatch = text.match(/Design last saved\s*:\s*(.+)/);
    if (lastSavedMatch) result.designLastSaved = parseDate(lastSavedMatch[1]);

    const printedMatch = text.match(/Date printed:\s*(.+)/);
    if (printedMatch) result.datePrinted = parseDate(printedMatch[1]);

    // Parse color sequence from Stop Sequence section
    // PDF extraction puts each field on separate lines:
    // 1.
    // 10
    // 1.279
    // 10 Orange
    // Default
    const stopSequenceMatch = text.match(/Stop Sequence:[\s\S]*?(?=Machine runtime:|$)/);
    console.log('Stop Sequence section found:', !!stopSequenceMatch);

    if (stopSequenceMatch) {
        const stopSection = stopSequenceMatch[0];
        console.log('Stop sequence raw (first 800 chars):', stopSection.substring(0, 800));

        // Parse line by line - Two possible patterns:
        // 
        // Pattern A (separate lines):
        // Line 1: "1." (stop number)
        // Line 2: "10" (N#)
        // Line 3: "1.279" (stitches)
        // Line 4: "10 Orange" (color code + name)
        // Line 5: "Default" (chart)
        //
        // Pattern B (stop+N# on same line):
        // Line 1: "10. 10" (stop number + N#)
        // Line 2: "892" (stitches)
        // Line 3: "10 Orange" (color code + name)
        // Line 4: "Default" (chart)

        const lines = stopSection.split('\n').map(l => l.trim()).filter(l => l);
        console.log('Total lines in stop section:', lines.length);

        let i = 0;
        while (i < lines.length) {
            // Pattern A: Look for stop number only like "1."
            const stopOnlyMatch = lines[i].match(/^(\d+)\.$/);
            // Pattern B: Look for stop + N# like "10. 10"  
            const stopWithNMatch = lines[i].match(/^(\d+)\.\s+(\d+)$/);

            if (stopOnlyMatch && i + 4 < lines.length) {
                // Pattern A: Separate lines
                const stopNum = parseInt(stopOnlyMatch[1]);
                const nNum = lines[i + 1];
                const stitchesRaw = lines[i + 2];
                const colorLine = lines[i + 3];
                const chart = lines[i + 4];

                const colorMatch = colorLine.match(/^(\d+)\s+(.+)$/);
                if (colorMatch) {
                    const colorCode = colorMatch[1];
                    const colorName = colorMatch[2].trim();
                    const colorInfo = getColorInfo(colorCode, colorName);

                    let stitches = 0;
                    if (stitchesRaw.includes('.')) {
                        stitches = parseInt(stitchesRaw.replace('.', '')) || 0;
                    } else {
                        stitches = parseInt(stitchesRaw) || 0;
                    }

                    console.log('Parsed stop (Pattern A):', { stopNum, colorCode, colorName, stitches, chart });

                    result.colorSequence.push({
                        stop: stopNum,
                        colorCode: colorCode,
                        colorName: colorInfo.name,
                        hex: colorInfo.hex,
                        stitches: stitches,
                        threadUsedM: 0,
                    });

                    i += 5;
                    continue;
                }
            } else if (stopWithNMatch && i + 3 < lines.length) {
                // Pattern B: Stop and N# on same line
                const stopNum = parseInt(stopWithNMatch[1]);
                const nNum = stopWithNMatch[2];
                const stitchesRaw = lines[i + 1];
                const colorLine = lines[i + 2];
                const chart = lines[i + 3];

                const colorMatch = colorLine.match(/^(\d+)\s+(.+)$/);
                if (colorMatch) {
                    const colorCode = colorMatch[1];
                    const colorName = colorMatch[2].trim();
                    const colorInfo = getColorInfo(colorCode, colorName);

                    let stitches = 0;
                    if (stitchesRaw.includes('.')) {
                        stitches = parseInt(stitchesRaw.replace('.', '')) || 0;
                    } else {
                        stitches = parseInt(stitchesRaw) || 0;
                    }

                    console.log('Parsed stop (Pattern B):', { stopNum, colorCode, colorName, stitches, chart });

                    result.colorSequence.push({
                        stop: stopNum,
                        colorCode: colorCode,
                        colorName: colorInfo.name,
                        hex: colorInfo.hex,
                        stitches: stitches,
                        threadUsedM: 0,
                    });

                    i += 4;
                    continue;
                }
            }
            i++;
        }

        console.log('Total color sequence items:', result.colorSequence.length);
    }

    // Parse detailed color info from Color Film section
    const colorFilmMatch = text.match(/Color:\s*\d+[\s\S]*?(?=Color Film|Production Summary|$)/g);
    if (colorFilmMatch) {
        const colorMap = new Map<string, WilcomColor>();

        for (const colorBlock of colorFilmMatch) {
            const codeMatch = colorBlock.match(/Code:\s*(\d+)/);
            const nameMatch = colorBlock.match(/Name:\s*(\w+(?:\s+\w+)?)/);
            const stitchesMatch = colorBlock.match(/Stitches:\s*([\d.,]+)/);
            const threadMatch = colorBlock.match(/Thread used:\s*([\d.,]+)m/);
            const chartMatch = colorBlock.match(/Chart:\s*(\w+)/);

            if (codeMatch) {
                const code = codeMatch[1];
                const colorInfo = getColorInfo(code, nameMatch?.[1]);

                if (!colorMap.has(code)) {
                    colorMap.set(code, {
                        code,
                        name: colorInfo.name,
                        hex: colorInfo.hex,
                        stitches: 0,
                        threadUsedM: 0,
                        chart: chartMatch?.[1] || 'Default',
                    });
                }

                const existingColor = colorMap.get(code)!;
                existingColor.stitches += parseInt(stitchesMatch?.[1]?.replace(/[.,]/g, '') || '0');
                existingColor.threadUsedM += parseNumber(threadMatch?.[1]) || 0;
            }
        }

        result.colors = Array.from(colorMap.values());
    }

    // Always derive unique colors from colorSequence for reliability
    // This ensures we have colors even if Color Film section parsing fails
    if (result.colors.length === 0 || result.colors.length < result.colorCount) {
        const uniqueColors = new Map<string, WilcomColor>();

        for (const seqItem of result.colorSequence) {
            if (!uniqueColors.has(seqItem.colorCode)) {
                uniqueColors.set(seqItem.colorCode, {
                    code: seqItem.colorCode,
                    name: seqItem.colorName,
                    hex: seqItem.hex,
                    stitches: seqItem.stitches,
                    threadUsedM: seqItem.threadUsedM,
                    chart: 'Default',
                });
            } else {
                const existing = uniqueColors.get(seqItem.colorCode)!;
                existing.stitches += seqItem.stitches;
            }
        }

        result.colors = Array.from(uniqueColors.values());
        console.log('Colors derived from colorSequence:', result.colors.length);
    }

    return result;
}

// Extract images from PDF using pdf-parse doesn't support images,
// We'll use a Python helper or puppeteer for this
export async function extractPdfImages(
    pdfPath: string,
    outputDir: string
): Promise<{ designImage: string | null; artworkImage: string | null }> {
    // For now, we'll handle this server-side with Python
    // This is a placeholder that will be replaced with actual implementation
    return {
        designImage: null,
        artworkImage: null,
    };
}

// Generate Approval Card HTML with data
export function generateOperatorApprovalHtml(data: WilcomParsedData, images: {
    designImageBase64?: string;
    artworkImageBase64?: string;
}): string {
    const { designImageBase64, artworkImageBase64 } = images;

    // Convert mm to inches for display
    const heightInches = parseFloat((data.heightMm / 25.4).toFixed(2));
    const widthInches = parseFloat((data.widthMm / 25.4).toFixed(2));

    // PPI (Pixels Per Inch) constant used for display scaling
    const PPI = 80;

    // Generate dynamic ruler marks
    // Calculate max ruler value (round up to nearest 0.5 inch with some margin)
    const maxVertical = Math.ceil(heightInches + 0.5);
    const maxHorizontal = Math.ceil(widthInches + 0.5);

    // Container dimensions in pixels
    const containerHeight = maxVertical * PPI;
    // We'll limit width to avoid overflow if design is huge, but typically embroidery is handled within bounds

    // Generate vertical ruler marks
    const verticalMarks: string[] = [];
    for (let i = 1; i <= maxVertical; i++) {
        const bottomPx = i * PPI;
        verticalMarks.push(`
            <div class="v-number" style="bottom: ${bottomPx}px;">${i}</div>
            <div class="v-tick major" style="bottom: ${bottomPx}px;"></div>
        `);
        if (i < maxVertical) {
            const halfBottomPx = (i + 0.5) * PPI;
            verticalMarks.push(`<div class="v-tick" style="bottom: ${halfBottomPx}px;"></div>`);
        }
    }

    // Generate horizontal ruler marks
    const horizontalMarks: string[] = [];
    for (let i = 1; i <= maxHorizontal; i++) {
        const leftPx = i * PPI;
        horizontalMarks.push(`
            <div class="h-number" style="left: ${leftPx}px;">${i}</div>
            <div class="h-tick major" style="left: ${leftPx}px;"></div>
        `);
        if (i < maxHorizontal) {
            const halfLeftPx = (i + 0.5) * PPI;
            horizontalMarks.push(`<div class="h-tick" style="left: ${halfLeftPx}px;"></div>`);
        }
    }

    // Generate color grid HTML
    const colorGridHtml = data.colors.map(color => `
        <div class="color-cell">
            <div class="color-code" style="background: ${color.hex}; color: ${getContrastColor(color.hex)}">${color.code}</div>
            <div class="color-name">${color.name}</div>
            <div class="color-length">${color.threadUsedM.toFixed(1)}m</div>
        </div>
    `).join('');

    // Generate color sequence HTML
    const colorSequenceHtml = data.colorSequence.map((item, index) => `
        <div class="seq-item">
            <div class="seq-circle" style="background: ${item.hex}; color: ${getContrastColor(item.hex)}">${index + 1}</div>
            <div class="seq-number">${item.colorCode}</div>
        </div>
    `).join('');

    // Split sequence into rows of 20
    const sequenceRows: string[] = [];
    for (let i = 0; i < data.colorSequence.length; i += 20) {
        const rowItems = data.colorSequence.slice(i, i + 20).map((item, idx) => `
            <div class="seq-item">
                <div class="seq-circle" style="background: ${item.hex}; color: ${getContrastColor(item.hex)}">${i + idx + 1}</div>
                <div class="seq-number">${item.colorCode}</div>
            </div>
        `).join('');
        sequenceRows.push(`<div class="color-sequence">${rowItems}</div>`);
    }

    const designImageSrc = designImageBase64
        ? `data:image/png;base64,${designImageBase64}`
        : '';

    const artworkImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Operator Approval Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: white;
            padding: 0;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 0 auto;
            padding: 10mm;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
        }
        
        .header-left h1 { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
        .header-left p { font-size: 11px; color: #666; }
        
        .header-right {
            text-align: right;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .barcode { font-family: 'Libre Barcode 128', cursive; font-size: 40px; }
        .rid-box { border: 2px solid #000; padding: 4px 8px; font-weight: 600; font-size: 14px; }
        
        .title {
            text-align: center;
            font-size: 30px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 8px;
            margin-bottom: 15px;
        }
        
        .design-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .info-left {
            display: grid;
            grid-template-columns: 160px 1fr;
            gap: 0px;
            align-items: center;
        }
        
        .info-label { font-weight: 600; font-size: 13px; }
        .info-value { font-size: 13px; }
        
        .info-right { display: flex; flex-direction: column; align-items: flex-end; }
        .customer-artwork-label { font-weight: 600; font-size: 11px; margin-bottom: 5px; }
        
        .artwork-preview {
            width: 120px;
            height: 120px;
            border: 2px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
        }
        
        .artwork-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .color-grid-section { margin-bottom: 12px; }
        .section-title { font-weight: 700; font-size: 14px; margin-bottom: 10px; }
        
        .color-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 3px;
            margin-bottom: 12px;
        }
        
        .color-cell { display: flex; height: 28px; border: 1px solid #ddd; }
        
        .color-code {
            font-weight: 600;
            font-size: 10px;
            padding: 0 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 35px;
        }
        
        .color-name {
            background: white;
            font-size: 10px;
            padding: 0 6px;
            display: flex;
            align-items: center;
            font-weight: 500;
            flex: 1;
        }
        
        .color-length {
            background: white;
            font-size: 10px;
            padding: 0 4px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            min-width: 38px;
            border-left: 1px solid #ddd;
        }
        
        .color-sequence-section { margin-bottom: 15px; }
        
        .color-sequence {
            display: grid;
            grid-template-columns: repeat(20, 1fr);
            gap: 2px;
            margin-bottom: 3px;
        }
        
        .seq-item { text-align: center; }
        
        .seq-circle {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2px;
            font-size: 9px;
            font-weight: 700;
            border: 1px solid #000;
        }
        
        .seq-number { font-size: 8px; font-weight: 600; color: #000; }
        
        .ruler-section { margin-bottom: 25px; position: relative; }
        
        .ruler-area {
            padding: 0;
            border: 2px solid #000;
            min-height: 365px;
            position: relative;
            background: white;
        }
        
        .vertical-ruler {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 40px;
            width: 40px;
            background: #000;
            color: white;
        }
        
        .corner-block {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 40px;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .corner-label { color: white; font-size: 10px; font-weight: 600; transform: rotate(-45deg); }
        
        .v-tick { position: absolute; right: 0; width: 15px; height: 2px; background: white; }
        .v-tick.major { width: 25px; height: 3px; }
        .v-number { position: absolute; right: 28px; font-size: 12px; font-weight: 600; transform: translateY(-50%); }
        
        .horizontal-ruler {
            position: absolute;
            bottom: 0;
            left: 40px;
            right: 0;
            height: 40px;
            background: #000;
            color: white;
        }
        
        .h-tick { position: absolute; bottom: 0; width: 2px; height: 15px; background: white; }
        .h-tick.major { height: 25px; width: 3px; }
        .h-number { position: absolute; bottom: 28px; font-size: 12px; font-weight: 600; transform: translateX(-50%); }
        
        .embroidery-area {
            position: absolute;
            left: 40px;
            bottom: 40px;
            display: flex;
            align-items: flex-end;  /* Align to bottom */
            justify-content: flex-start;  /* Align to left - origin point */
            background: #ffffff;
            padding: 0;  /* No padding for accurate positioning */
            overflow: hidden;
        }
        
        .embroidery-placeholder { 
            object-fit: fill;  /* Fill the container completely to match ruler scale */
            object-position: left bottom;  /* Align to origin (0,0) */
        }
        
        .approval-section { display: flex; gap: 40px; margin-bottom: 20px; font-size: 14px; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
        .checkbox { width: 20px; height: 20px; border: 2px solid #000; display: inline-block; }
        .approval-label { font-weight: 500; }
        
        .notes-section { margin-top: 20px; }
        .notes-title { font-weight: 700; font-size: 16px; margin-bottom: 10px; }
        .notes-area { border: 2px solid #000; min-height: 60px; padding: 10px; background: white; }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="header-left">
                <h1>www.APPROVALSTITCH.com</h1>
            </div>
            <div class="header-right">
                <div class="barcode">*${data.designName}*</div>
                <div class="rid-box">${data.designName}</div>
            </div>
        </div>
        
        <div class="title">Operator Approval Card</div>
        
        <div class="design-info">
            <div class="info-left">
                <div class="info-label">Design Name:</div>
                <div class="info-value">${data.designName}</div>
                
                <div class="info-label">Final Size:</div>
                <div class="info-value">${widthInches}" x ${heightInches}"</div>
                
                <div class="info-label">Stitch Count:</div>
                <div class="info-value">${data.stitchCount.toLocaleString()}</div>
                
                <div class="info-label">Machine Runtime:</div>
                <div class="info-value">${data.machineRuntime || 'N/A'}</div>
                
                <div class="info-label">Machine Format:</div>
                <div class="info-value">${data.machineFormat || 'N/A'}</div>
                
                <div class="info-label">Color Changes:</div>
                <div class="info-value">${data.colorChanges || 0}</div>
                
                <div class="info-label">Stops:</div>
                <div class="info-value">${data.stops || 0}</div>
                
                <div class="info-label">Trims:</div>
                <div class="info-value">${data.trims || 0}</div>
                
                <div class="info-label">Total Thread:</div>
                <div class="info-value">${data.totalThreadM?.toFixed(2) || 'N/A'}m</div>
            </div>
            
            <div class="info-right">
                <div class="customer-artwork-label">Customer<br>Artwork</div>
                <div class="artwork-preview">
                    <img src="${artworkImageSrc}" alt="Artwork Preview">
                </div>
            </div>
        </div>
        
        <div class="color-grid-section">
            <div class="section-title">Color Grid</div>
            <div class="color-grid">
                ${colorGridHtml}
            </div>
        </div>
        
        <div class="color-sequence-section">
            <div class="section-title">Color Sequence:</div>
            ${sequenceRows.join('')}
        </div>
        
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 365px;">
                <div class="corner-block">
                    <div class="corner-label">inch</div>
                </div>
                
                <div class="vertical-ruler">
                    ${verticalMarks.join('')}
                </div>
                
                <div class="horizontal-ruler">
                    ${horizontalMarks.join('')}
                </div>
                
                <div class="embroidery-area" style="height: ${containerHeight}px;">
                    ${designImageSrc ? `<img src="${designImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
                </div>
            </div>
        </div>
        
        <div class="approval-section">
            <div class="checkbox-group">
                <span class="checkbox"></span>
                <span class="approval-label">APPROVED</span>
            </div>
            <div class="checkbox-group">
                <span class="checkbox"></span>
                <span class="approval-label">CHANGES NEEDED (see notes below)</span>
            </div>
        </div>
        
        <div class="notes-section">
            <div class="notes-title">Notes:</div>
            <div class="notes-area"></div>
        </div>
    </div>
</body>
</html>`;
}

// Generate Customer Approval Card (simplified version)
export function generateCustomerApprovalHtml(data: WilcomParsedData, images: {
    designImageBase64?: string;
    artworkImageBase64?: string;
}): string {
    const { designImageBase64, artworkImageBase64 } = images;

    // Convert mm to inches for display
    const heightInches = parseFloat((data.heightMm / 25.4).toFixed(2));
    const widthInches = parseFloat((data.widthMm / 25.4).toFixed(2));

    // PPI (Pixels Per Inch) constant used for display scaling
    const PPI = 80;

    // Generate dynamic ruler marks (same logic as operator card)
    const maxVertical = Math.ceil(heightInches + 0.5);
    const maxHorizontal = Math.ceil(widthInches + 0.5);

    // Container dimensions in pixels
    const containerHeight = maxVertical * PPI;

    const verticalMarks: string[] = [];
    for (let i = 1; i <= maxVertical; i++) {
        const bottomPx = i * PPI;
        verticalMarks.push(`
            <div class="v-number" style="bottom: ${bottomPx}px;">${i}</div>
            <div class="v-tick major" style="bottom: ${bottomPx}px;"></div>
        `);
        if (i < maxVertical) {
            const halfBottomPx = (i + 0.5) * PPI;
            verticalMarks.push(`<div class="v-tick" style="bottom: ${halfBottomPx}px;"></div>`);
        }
    }

    const horizontalMarks: string[] = [];
    for (let i = 1; i <= maxHorizontal; i++) {
        const leftPx = i * PPI;
        horizontalMarks.push(`
            <div class="h-number" style="left: ${leftPx}px;">${i}</div>
            <div class="h-tick major" style="left: ${leftPx}px;"></div>
        `);
        if (i < maxHorizontal) {
            const halfLeftPx = (i + 0.5) * PPI;
            horizontalMarks.push(`<div class="h-tick" style="left: ${halfLeftPx}px;"></div>`);
        }
    }

    const designImageSrc = designImageBase64
        ? `data:image/png;base64,${designImageBase64}`
        : '';

    const artworkImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Approval Card</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: white;
            padding: 0;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 0 auto;
            padding: 10mm;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
        }
        
        .header-left h1 { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
        
        .header-right {
            text-align: right;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .rid-box { border: 2px solid #000; padding: 4px 8px; font-weight: 600; font-size: 14px; }
        
        .title {
            text-align: center;
            font-size: 30px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 8px;
            margin-bottom: 15px;
        }
        
        .design-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .info-left {
            display: grid;
            grid-template-columns: 160px 1fr;
            gap: 5px;
            align-items: center;
        }
        
        .info-label { font-weight: 600; font-size: 13px; }
        .info-value { font-size: 13px; }
        
        .info-right { display: flex; flex-direction: column; align-items: flex-end; }
        .customer-artwork-label { font-weight: 600; font-size: 11px; margin-bottom: 5px; }
        
        .artwork-preview {
            width: 120px;
            height: 120px;
            border: 2px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
        }
        
        .artwork-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .ruler-section { margin-bottom: 25px; position: relative; }
        
        .ruler-area {
            padding: 0;
            border: 2px solid #000;
            min-height: 400px;
            position: relative;
            background: white;
        }
        
        .vertical-ruler {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 50px;
            width: 50px;
            background: #000;
            color: white;
        }
        
        .corner-block {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50px;
            height: 50px;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .corner-label { color: white; font-size: 11px; font-weight: 600; transform: rotate(-45deg); }
        
        .v-tick { position: absolute; right: 0; width: 20px; height: 2px; background: white; }
        .v-tick.major { width: 30px; height: 3px; }
        .v-number { position: absolute; right: 35px; font-size: 16px; font-weight: 600; transform: translateY(-50%); }
        
        .horizontal-ruler {
            position: absolute;
            bottom: 0;
            left: 50px;
            right: 0;
            height: 50px;
            background: #000;
            color: white;
        }
        
        .h-tick { position: absolute; bottom: 0; width: 2px; height: 20px; background: white; }
        .h-tick.major { height: 30px; width: 3px; }
        .h-number { position: absolute; bottom: 32px; font-size: 16px; font-weight: 600; transform: translateX(-50%); }
        
        .embroidery-area {
            position: absolute;
            left: 50px;
            bottom: 50px;
            display: flex;
            align-items: flex-end;  /* Align to bottom */
            justify-content: flex-start;  /* Align to left - origin point */
            background: #ffffff;
            padding: 0;
            overflow: hidden;
        }
        
        .embroidery-placeholder { 
            object-fit: fill;  /* Fill the container completely to match ruler scale */
            object-position: left bottom;  /* Align to origin (0,0) */
        }
        
        .approval-section { display: flex; gap: 40px; margin-bottom: 20px; font-size: 14px; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; }
        .checkbox { width: 20px; height: 20px; border: 2px solid #000; display: inline-block; }
        .approval-label { font-weight: 500; }
        
        .notes-section { margin-top: 20px; }
        .notes-title { font-weight: 700; font-size: 16px; margin-bottom: 10px; }
        .notes-area { border: 2px solid #000; min-height: 80px; padding: 10px; background: white; }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="header-left">
                <h1>www.APPROVALSTITCH.com</h1>
            </div>
            <div class="header-right">
                <div class="rid-box">${data.designName}</div>
            </div>
        </div>
        
        <div class="title">Approval Card</div>
        
        <div class="design-info">
            <div class="info-left">
                <div class="info-label">Design Name:</div>
                <div class="info-value">${data.designName}</div>
                
                <div class="info-label">Final Size:</div>
                <div class="info-value">${widthInches}" x ${heightInches}"</div>
                
                <div class="info-label">Stitch Count:</div>
                <div class="info-value">${data.stitchCount.toLocaleString()}</div>
                
                <div class="info-label">Colors:</div>
                <div class="info-value">${data.colorCount}</div>
            </div>
            
            <div class="info-right">
                <div class="customer-artwork-label">Customer<br>Artwork</div>
                <div class="artwork-preview">
                    <img src="${artworkImageSrc}" alt="Artwork Preview">
                </div>
            </div>
        </div>
        
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 400px;">
                <div class="corner-block">
                    <div class="corner-label">inch</div>
                </div>
                
                <div class="vertical-ruler">
                    ${verticalMarks.join('')}
                </div>
                
                <div class="horizontal-ruler">
                    ${horizontalMarks.join('')}
                </div>
                
                <div class="embroidery-area" style="height: ${containerHeight}px;">
                    ${designImageSrc ? `<img src="${designImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
                </div>
            </div>
        </div>
        
        <div class="approval-section">
            <div class="checkbox-group">
                <span class="checkbox"></span>
                <span class="approval-label">APPROVED</span>
            </div>
            <div class="checkbox-group">
                <span class="checkbox"></span>
                <span class="approval-label">CHANGES NEEDED (see notes below)</span>
            </div>
        </div>
        
        <div class="notes-section">
            <div class="notes-title">Notes:</div>
            <div class="notes-area"></div>
        </div>
    </div>
</body>
</html>`;
}

// Helper function to determine text color based on background
function getContrastColor(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Generate PDF from HTML using Puppeteer
export async function generatePdfFromHtml(html: string, outputPath: string): Promise<void> {
    // Dynamic import for puppeteer
    const puppeteer = await import('puppeteer');
    const browser: Browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
        });
    } finally {
        await browser.close();
    }
}

// Main function to process Wilcom PDF and generate approval cards
export async function processWilcomPdf(
    wilcomPdfPath: string,
    orderId: string,
    outputDir: string
): Promise<{
    data: WilcomParsedData;
    operatorPdfPath: string;
    customerPdfPath: string;
    designImagePath: string | null;
}> {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Parse Wilcom PDF
    const data = await parseWilcomPdf(wilcomPdfPath);

    // Extract images from PDF (using Python helper)
    let designImageBase64: string | undefined;

    // Try to extract design image using Python/PyMuPDF and remove background
    try {
        const { execSync } = await import('child_process');
        const { writeFileSync, unlinkSync, existsSync } = await import('fs');
        const { tmpdir } = await import('os');
        const tempScriptPath = join(tmpdir(), `extract_design_${Date.now()}.py`);

        const pythonScript = `
import fitz
import base64
import sys
from io import BytesIO

pdf_path = sys.argv[1]

# Try to use rembg for AI-based background removal
try:
    from rembg import remove
    from PIL import Image
    HAS_REMBG = True
except ImportError:
    HAS_REMBG = False

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

doc = fitz.open(pdf_path)
page = doc[0]
images = page.get_images()

if images:
    xref = images[0][0]
    pix = fitz.Pixmap(doc, xref)
    if pix.n >= 5:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    
    img_bytes = pix.tobytes("png")
    
    if HAS_REMBG:
        # Use AI-based background removal
        img = Image.open(BytesIO(img_bytes))
        output = remove(img)  # Returns RGBA with transparent background
        
        # Convert transparent to light gray for PDF compatibility
        if output.mode == 'RGBA':
            # Create a light gray background (now white as per latest change)
            background = Image.new('RGB', output.size, (255, 255, 255))
            # Paste the image onto the background using alpha as mask
            background.paste(output, mask=output.split()[3])
            output = background
        
        # TRIM LOGIC: Crop the image to the bounding box of non-white pixels
        # Convert to grayscale for thresholding
        gray = output.convert('L')
        # Invert so content is white, background is black
        import PIL.ImageOps
        inverted = PIL.ImageOps.invert(gray)
        # Get bounding box of non-black content
        bbox = inverted.getbbox()
        if bbox:
            output = output.crop(bbox)

        buffer = BytesIO()
        output.save(buffer, format="PNG")
        buffer.seek(0)
        print(base64.b64encode(buffer.read()).decode())
    elif HAS_PIL:
        # Fallback: Simple white replacement
        img = Image.open(BytesIO(img_bytes))
        img = img.convert("RGB")
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        
        # TRIM LOGIC for Fallback
        gray = img.convert('L')
        # We want to find non-white pixels. White is 255.
        # Threshold: make anything < 250 black (0), else white (255)
        # Then invert so content is white (255) to use getbbox
        threshold = 250
        bw = gray.point(lambda x: 0 if x < threshold else 255, '1')
        
        from PIL import ImageOps
        bw = ImageOps.invert(bw.convert('L'))
        bbox = bw.getbbox()
        if bbox:
            img = img.crop(bbox)
        
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        print(base64.b64encode(buffer.read()).decode())
    else:
        # No image processing available
        print(base64.b64encode(img_bytes).decode())
`;

        try {
            writeFileSync(tempScriptPath, pythonScript);
            const result = execSync(`python3 "${tempScriptPath}" "${wilcomPdfPath}"`, {
                encoding: 'utf-8',
                maxBuffer: 50 * 1024 * 1024
            });
            designImageBase64 = result.trim();

            // Cleanup
            if (existsSync(tempScriptPath)) {
                unlinkSync(tempScriptPath);
            }
        } catch (scriptError) {
            console.error('Python script execution failed:', scriptError);
            // Cleanup on error
            try {
                if (existsSync(tempScriptPath)) {
                    unlinkSync(tempScriptPath);
                }
            } catch { }
        }
    } catch (error) {
        console.error('Failed to extract design image:', error);
    }

    // Save design image if extracted
    let designImagePath: string | null = null;
    if (designImageBase64) {
        designImagePath = join(outputDir, `${orderId}_design.png`);
        await writeFile(designImagePath, Buffer.from(designImageBase64, 'base64'));
    }

    // Generate approval card HTML
    const operatorHtml = generateOperatorApprovalHtml(data, { designImageBase64 });
    const customerHtml = generateCustomerApprovalHtml(data, { designImageBase64 });

    // Debug: Save HTML to file for inspection
    await writeFile(join(outputDir, 'debug_operator.html'), operatorHtml);
    await writeFile(join(outputDir, 'debug_customer.html'), customerHtml);
    console.log('Debug HTMLs saved to:', outputDir);

    // Generate PDFs
    const operatorPdfPath = join(outputDir, `${orderId}_operator_approval.pdf`);
    const customerPdfPath = join(outputDir, `${orderId}_customer_approval.pdf`);

    await generatePdfFromHtml(operatorHtml, operatorPdfPath);
    await generatePdfFromHtml(customerHtml, customerPdfPath);

    return {
        data,
        operatorPdfPath,
        customerPdfPath,
        designImagePath,
    };
}
