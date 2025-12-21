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




// Extended Color Map
const COLOR_NAME_TO_HEX: Record<string, string> = {
    'black': '#000000', 'white': '#FFFFFF', 'red': '#FF0000', 'green': '#008000', 'blue': '#0000FF',
    'yellow': '#FFFF00', 'magenta': '#FF00FF', 'cyan': '#00FFFF', 'orange': '#FFA500', 'purple': '#800080',
    'pink': '#FFC0CB', 'brown': '#A52A2A', 'gray': '#808080', 'grey': '#808080', 'light gray': '#D3D3D3',
    'dark gray': '#A9A9A9', 'charcoal': '#36454F', 'navy': '#000080', 'royal blue': '#4169E1',
    'light blue': '#ADD8E6', 'sky blue': '#87CEEB', 'powder blue': '#B0E0E6', 'gold': '#FFD700',
    'silver': '#C0C0C0', 'khaki': '#F0E68C', 'sand': '#C2B280', 'beige': '#F5F5DC', 'cream': '#FFFDD0',
    'olive': '#808000', 'maroon': '#800000', 'burgundy': '#800020', 'teal': '#008080', 'turquoise': '#40E0D0',
    'lime': '#00FF00', 'emerald': '#50C878', 'forest green': '#228B22', 'dark green': '#006400',
    'dark blue': '#00008B', 'dark red': '#8B0000', 'lilac': '#C8A2C8', 'lavender': '#E6E6FA',
    'mustard': '#FFDB58', 'peach': '#FFDAB9', 'coral': '#FF7F50', 'rust': '#B7410E', 'mint': '#98FF98',
};

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
    if (name) {
        let cleanName = name.trim().replace(/\s+default$/i, '');
        const searchName = cleanName.toLowerCase();

        // Exact lookup
        if (COLOR_NAME_TO_HEX[searchName]) return { name: cleanName, hex: COLOR_NAME_TO_HEX[searchName] };

        // Fuzzy lookup
        const keys = Object.keys(COLOR_NAME_TO_HEX).sort((a, b) => b.length - a.length);
        for (const key of keys) {
            if (searchName.includes(key)) return { name: cleanName, hex: COLOR_NAME_TO_HEX[key] };
        }
    }

    const mapped = WILCOM_COLOR_MAP[code];
    if (mapped) return name ? { name: name.replace(/\s+default$/i, '').trim(), hex: mapped.hex } : mapped;

    return { name: name || `Color ${code}`, hex: '#888888' };
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
            const stopOnlyMatch = lines[i].match(/^(\d+)\.$/);
            const stopWithNMatch = lines[i].match(/^(\d+)\.\s+(\d+)$/);

            if (stopOnlyMatch) {
                const stopNum = parseInt(stopOnlyMatch[1]);
                let stitches = 0;
                let threadUsed = 0;
                let colorCode = '';
                let colorName = '';
                let found = false;
                let linesConsumed = 0;

                for (let k = 1; k <= 6; k++) {
                    if (i + k >= lines.length) break;
                    const line = lines[i + k];
                    if (line.match(/^\d+\.$/) || line.match(/^\d+\.\s+\d+$/)) break;

                    const mMatch = line.match(/([\d.,]+)\s*m\b/i);
                    if (mMatch) {
                        try { threadUsed = parseFloat(mMatch[1].replace(',', '.')); } catch (e) { }
                    }

                    const cMatch = line.match(/^(\d+)\s+([A-Za-z].+)$/);
                    if (cMatch) {
                        colorCode = cMatch[1];
                        colorName = cMatch[2].trim();
                        linesConsumed = k;
                        found = true;

                        for (let j = 1; j < k; j++) {
                            const pLine = lines[i + j];
                            if (pLine.match(/^[\d.,]+$/)) {
                                stitches = parseInt(pLine.replace(/[.,]/g, '')) || 0;
                            }
                        }
                    }
                }

                if (found) {
                    const colorInfo = getColorInfo(colorCode, colorName);
                    const derivedThread = stitches / 1000;
                    result.colorSequence.push({
                        stop: stopNum,
                        colorCode: colorCode,
                        colorName: colorInfo.name,
                        hex: colorInfo.hex,
                        stitches: stitches,
                        threadUsedM: threadUsed > 0 ? threadUsed : derivedThread,
                    });
                    i += linesConsumed + 1;
                    continue;
                }
            } else if (stopWithNMatch) {
                const stopNum = parseInt(stopWithNMatch[1]);
                let stitches = 0;
                let threadUsed = 0;
                let colorCode = '';
                let colorName = '';
                let found = false;
                let linesConsumed = 0;

                for (let k = 1; k <= 5; k++) {
                    if (i + k >= lines.length) break;
                    const line = lines[i + k];
                    if (line.match(/^\d+\.$/) || line.match(/^\d+\.\s+\d+$/)) break;

                    const mMatch = line.match(/([\d.,]+)\s*m\b/i);
                    if (mMatch) {
                        try { threadUsed = parseFloat(mMatch[1].replace(',', '.')); } catch (e) { }
                    }

                    const cMatch = line.match(/^(\d+)\s+([A-Za-z].+)$/);
                    if (cMatch) {
                        colorCode = cMatch[1];
                        colorName = cMatch[2].trim();
                        linesConsumed = k;
                        found = true;
                        for (let j = 1; j < k; j++) {
                            const pLine = lines[i + j];
                            if (pLine.match(/^[\d.,]+$/)) {
                                stitches = parseInt(pLine.replace(/[.,]/g, '')) || 0;
                            }
                        }
                    }
                }

                if (found) {
                    const colorInfo = getColorInfo(colorCode, colorName);
                    const derivedThread = stitches / 1000;
                    result.colorSequence.push({
                        stop: stopNum,
                        colorCode: colorCode,
                        colorName: colorInfo.name,
                        hex: colorInfo.hex,
                        stitches: stitches,
                        threadUsedM: threadUsed > 0 ? threadUsed : derivedThread,
                    });
                    i += linesConsumed + 1;
                    continue;
                }
            }
            i++;
        }
    }
    console.log('Total color sequence items:', result.colorSequence.length);

    // Color Film section is intentionally ignored here to use robust sequence data



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
                existing.threadUsedM += seqItem.threadUsedM;
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

    // Split sequence into rows of 25 (Show all stops)
    const sequenceRowsArr: string[] = [];
    for (let i = 0; i < data.colorSequence.length; i += 25) {
        const rowItems = data.colorSequence.slice(i, i + 25).map((item, idx) => `
            <div class="seq-item">
                <div class="seq-circle" style="background: ${item.hex}; color: ${getContrastColor(item.hex)}">${i + idx + 1}</div>
                <div class="seq-number">${item.colorCode}</div>
            </div>
        `).join('');
        sequenceRowsArr.push(`<div class="color-sequence">${rowItems}</div>`);
    }

    const isMultiPage = data.colorSequence.length > 75;

    // Dynamic PPI calculation to fit within A4 page
    const MAX_RULER_HEIGHT_PX = isMultiPage ? 720 : 500;
    const MAX_RULER_WIDTH_PX = 720;
    const PAGE_WIDTH_PX = 720;

    // Calculate required PPI to fit the design
    const basePPI = 80;
    const maxVerticalInches = Math.ceil(heightInches + 1);
    const maxHorizontalInches = Math.ceil(widthInches + 0.5);

    const ppiForHeight = MAX_RULER_HEIGHT_PX / maxVerticalInches;
    const ppiForWidth = MAX_RULER_WIDTH_PX / maxHorizontalInches;

    const PPI = Math.min(basePPI, ppiForHeight, ppiForWidth);

    const maxVertical = maxVerticalInches;
    const maxHorizontal = Math.floor(PAGE_WIDTH_PX / PPI);
    const containerHeight = maxVertical * PPI;

    // Generate vertical ruler marks
    const verticalMarks: string[] = [];
    for (let i = 0; i <= maxVertical; i++) {
        const bottomPx = i * PPI;
        if (i > 0) {
            verticalMarks.push(`
                <div class="v-number" style="bottom: ${bottomPx}px;">${i}</div>
                <div class="v-tick major" style="bottom: ${bottomPx}px;"></div>
            `);
        }
        if (i < maxVertical) {
            verticalMarks.push(`<div class="v-tick" style="bottom: ${(i + 0.25) * PPI}px;"></div>`);
            verticalMarks.push(`<div class="v-tick half" style="bottom: ${(i + 0.5) * PPI}px;"></div>`);
            verticalMarks.push(`<div class="v-tick" style="bottom: ${(i + 0.75) * PPI}px;"></div>`);
        }
    }

    // Generate horizontal ruler marks
    const horizontalMarks: string[] = [];
    for (let i = 0; i <= maxHorizontal; i++) {
        const leftPx = i * PPI;
        if (i > 0) {
            horizontalMarks.push(`
                <div class="h-number" style="left: ${leftPx}px;">${i}</div>
                <div class="h-tick major" style="left: ${leftPx}px;"></div>
            `);
        }
        if (i < maxHorizontal) {
            horizontalMarks.push(`<div class="h-tick" style="left: ${(i + 0.25) * PPI}px;"></div>`);
            horizontalMarks.push(`<div class="h-tick half" style="left: ${(i + 0.5) * PPI}px;"></div>`);
            horizontalMarks.push(`<div class="h-tick" style="left: ${(i + 0.75) * PPI}px;"></div>`);
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

    const designImageSrc = designImageBase64 ? `data:image/png;base64,${designImageBase64}` : '';
    const artworkImageSrc = artworkImageBase64 ? `data:image/png;base64,${artworkImageBase64}` : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";
    const barcodeText = `*${Math.random().toString(36).substring(2, 12).toUpperCase()}*`;

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Libre+Barcode+128&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 20px 0;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 0 auto ${isMultiPage ? '20px' : '0'};
            padding: 8mm 10mm;
            position: relative;
            box-sizing: border-box;
            box-shadow: ${isMultiPage ? '0 0 10px rgba(0,0,0,0.1)' : 'none'};
        }
        
        .page-footer {
            position: absolute;
            bottom: 6mm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            color: #666;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .page { margin: 0; border: none; box-shadow: none; page-break-after: always; }
            .page:last-child { page-break-after: avoid; }
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
        }
        
        .header-left h1 { font-size: 16px; font-weight: 700; margin-bottom: 1px; }
        .header-left p { font-size: 10px; color: #666; }
        
        .header-right {
            text-align: right;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .barcode { font-family: 'Libre Barcode 128', cursive; font-size: 32px; }
        .rid-box { border: 2px solid #000; padding: 2px 6px; font-weight: 600; font-size: 12px; }
        
        .title {
            text-align: center;
            font-size: ${isMultiPage ? '20' : '24'}px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 10px;
        }
        
        .top-content {
            display: grid;
            grid-template-columns: 1fr 140px;
            gap: 15px;
            margin-bottom: 12px;
        }
        
        .design-info {
            display: grid;
            grid-template-columns: 140px 1fr;
            gap: 2px;
            align-items: center;
        }
        
        .info-label { font-weight: 600; font-size: 11px; }
        .info-value { font-size: 11px; }
        
        .artwork-preview-box { text-align: right; }
        .customer-artwork-label { font-weight: 600; font-size: 9px; margin-bottom: 3px; display: block; }
        
        .artwork-preview {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
            margin-left: auto;
        }
        
        .artwork-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .section-title { 
            font-weight: 800; 
            font-size: 11px; 
            margin-bottom: 8px; 
            border-bottom: 1px solid #ccc; 
            padding-bottom: 1px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: table;
        }
        
        .color-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 2px;
            margin-bottom: 10px;
        }
        
        .color-cell { display: flex; height: 22px; border: 1px solid #eee; }
        .color-code { font-weight: 700; font-size: 8px; padding: 0 4px; display: flex; align-items: center; justify-content: center; min-width: 24px; }
        .color-name { background: white; font-size: 8px; padding: 0 4px; display: flex; align-items: center; font-weight: 500; flex: 1; overflow: hidden; white-space: nowrap; }
        .color-length { background: white; font-size: 8px; padding: 0 3px; display: flex; align-items: center; justify-content: flex-end; min-width: 24px; border-left: 1px solid #eee; }
        
        .color-sequence {
            display: grid;
            grid-template-columns: repeat(25, 1fr);
            gap: 2px;
            width: 100%;
            margin-bottom: 4px;
        }
        
        .seq-item { text-align: center; }
        .seq-circle {
            width: 100%;
            aspect-ratio: 1;
            max-width: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1px;
            font-size: 7px;
            font-weight: 700;
            border: 1px solid #000;
        }
        .seq-number { font-size: 6px; font-weight: 700; color: #000; }
        
        .ruler-section { margin-bottom: 15px; position: relative; }
        
        .ruler-area {
            padding: 0;
            border: 2px solid #000;
            min-height: 350px;
            position: relative;
            background: white;
            overflow: hidden;
        }
        
        .vertical-ruler {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 35px;
            width: 35px;
            background: #000;
            color: white;
            z-index: 10;
        }
        
        .corner-block {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 35px;
            height: 35px;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            font-weight: 600;
        }
        
        .corner-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: white; }
        .corner-block::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 1px; background: white; }
        
        .v-tick { position: absolute; right: 0; width: 6px; height: 1px; background: white; }
        .v-tick.half { width: 12px; }
        .v-tick.major { width: 35px; }
        .v-number { position: absolute; left: 4px; transform: translateY(-50%); font-size: 10px; font-weight: 600; color: white; }
        
        .horizontal-ruler {
            position: absolute;
            bottom: 0;
            left: 35px;
            right: 0;
            height: 35px;
            background: #000;
            color: white;
            z-index: 10;
        }
        
        .h-tick { position: absolute; top: 0; width: 1px; height: 6px; background: white; }
        .h-tick.half { height: 12px; }
        .h-tick.major { height: 35px; }
        .h-number { position: absolute; top: 15px; transform: translateX(-50%); margin-left: -10px; font-size: 10px; font-weight: 600; color: white; }
        
        .embroidery-area {
            position: absolute;
            left: 35px;
            bottom: 35px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            background: #ffffff;
            padding: 0;
            overflow: hidden;
        }
        
        .embroidery-placeholder { object-fit: fill; object-position: left bottom; }
        
        .bottom-sections {
            ${isMultiPage ? 'margin-top: 10px;' : 'position: absolute; bottom: 15mm; left: 10mm; right: 10mm;'}
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-top: ${isMultiPage ? '2px solid #000' : '1px solid #eee'};
            padding-top: 10px;
        }
        
        .approval-section { display: flex; flex-direction: row; gap: 40px; font-size: 11px; margin-bottom: 2px; }
        .checkbox-group { display: flex; align-items: center; gap: 8px; }
        .checkbox { width: 16px; height: 16px; border: 2px solid #000; display: inline-block; }
        .approval-label { font-weight: 700; text-transform: uppercase; font-size: 11px; }
        
        .notes-area { border: 2px solid #000; min-height: 40px; padding: 6px; background: white; }
        .notes-title { font-weight: 700; font-size: 11px; margin-bottom: 2px; }
    `;

    const commonHeader = `
        <div class="header">
            <div class="header-left">
                <h1>www.APPROVALSTITCH.com</h1>
                <p>High-End Embroidery Digitizing Services</p>
            </div>
            <div class="header-right">
                <div class="barcode">${barcodeText}</div>
                <div class="rid-box">${data.designName}</div>
            </div>
        </div>
    `;

    const commonFooter = (page: number, total: number) => `
        <div class="page-footer">${data.designName} - Page ${page}/${total} - approvalstitch.com</div>
    `;

    const technicalContent = `
        <div class="section-title">Project Info</div>
        <div class="top-content">
            <div class="design-info">
                <div class="info-label">Design Name:</div> <div class="info-value">${data.designName}</div>
                <div class="info-label">Final Size:</div> <div class="info-value">${widthInches}" x ${heightInches}"</div>
                <div class="info-label">Stitch Count:</div> <div class="info-value">${data.stitchCount.toLocaleString()}</div>
                <div class="info-label">Colors / Stops:</div> <div class="info-value">${data.colorCount} / ${data.stops || 0}</div>
                <div class="info-label">Runtime:</div> <div class="info-value">${data.machineRuntime || 'N/A'}</div>
            </div>
            <div class="artwork-preview-box">
                <span class="customer-artwork-label">CUSTOMER ARTWORK</span>
                <div class="artwork-preview">
                    <img src="${artworkImageSrc}" alt="Customer Artwork">
                </div>
            </div>
        </div>
        
        <div class="section-title">Color Grid & Usage</div>
        <div class="color-grid">${colorGridHtml}</div>

        <div class="section-title">Color Sequence (Stops)</div>
        ${sequenceRowsArr.join('')}
    `;

    const visualContent = `
        <div class="section-title">Visual Preview (Scaled)</div>
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 350px;">
                <div class="corner-block"><div class="corner-label">inch</div></div>
                <div class="vertical-ruler">${verticalMarks.join('')}</div>
                <div class="horizontal-ruler">${horizontalMarks.join('')}</div>
                <div class="embroidery-area" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px; margin-top: ${0.5 * PPI}px;">
                    ${designImageSrc ? `<img src="${designImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: 100%; height: 100%;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
                </div>
            </div>
        </div>
        
        <div class="bottom-sections">
            <div class="section-title">Operator Final Quality Check</div>
            <div class="approval-section">
                <div class="checkbox-group"><span class="checkbox"></span><span class="approval-label">APPROVED</span></div>
                <div class="checkbox-group"><span class="checkbox"></span><span class="approval-label">CHANGES NEEDED</span></div>
            </div>
            <div class="notes-section">
                <div class="notes-title">Notes & Feedback:</div>
                <div class="notes-area"></div>
            </div>
        </div>
    `;

    if (isMultiPage) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Operator Approval Card</title>
    <style>${styles}</style>
</head>
<body>
    <div class="page">
        ${commonHeader}
        <div class="title">OPERATOR CARD - TECH SPECS</div>
        ${technicalContent}
        ${commonFooter(1, 2)}
    </div>

    <div class="page">
        ${commonHeader}
        <div class="title">OPERATOR CARD - VISUAL PROOF</div>
        ${visualContent}
        ${commonFooter(2, 2)}
    </div>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Operator Approval Card</title>
    <style>${styles}</style>
</head>
<body>
    <div class="page">
        ${commonHeader}
        <div class="title">OPERATOR APPROVAL CARD</div>
        ${technicalContent}
        ${visualContent}
        ${commonFooter(1, 1)}
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

    // Dynamic PPI calculation to fit within A4 page (same as operator card)
    const MAX_RULER_HEIGHT_PX = 550; // More space for customer card as it has less technical info
    const MAX_RULER_WIDTH_PX = 720;
    const PAGE_WIDTH_PX = 720;

    const basePPI = 80;
    const maxVerticalInches = Math.ceil(heightInches + 1); // Extra space for 0.5 inch top margin
    const maxHorizontalInches = Math.ceil(widthInches + 0.5);

    const ppiForHeight = MAX_RULER_HEIGHT_PX / maxVerticalInches;
    const ppiForWidth = MAX_RULER_WIDTH_PX / maxHorizontalInches;

    const PPI = Math.min(basePPI, ppiForHeight, ppiForWidth);

    // Generate dynamic ruler marks (same logic as operator card)
    const maxVertical = maxVerticalInches;
    const maxHorizontal = Math.floor(PAGE_WIDTH_PX / PPI);

    // Container dimensions in pixels
    const containerHeight = maxVertical * PPI;

    // Generate vertical ruler marks
    const verticalMarks: string[] = [];
    for (let i = 0; i <= maxVertical; i++) {
        const bottomPx = i * PPI;
        if (i > 0) {
            verticalMarks.push(`
                <div class="v-number" style="bottom: ${bottomPx}px;">${i}</div>
                <div class="v-tick major" style="bottom: ${bottomPx}px;"></div>
            `);
        }
        if (i < maxVertical) {
            verticalMarks.push(`<div class="v-tick" style="bottom: ${(i + 0.25) * PPI}px;"></div>`);
            verticalMarks.push(`<div class="v-tick half" style="bottom: ${(i + 0.5) * PPI}px;"></div>`);
            verticalMarks.push(`<div class="v-tick" style="bottom: ${(i + 0.75) * PPI}px;"></div>`);
        }
    }

    // Generate horizontal ruler marks
    const horizontalMarks: string[] = [];
    for (let i = 0; i <= maxHorizontal; i++) {
        const leftPx = i * PPI;
        if (i > 0) {
            horizontalMarks.push(`
                <div class="h-number" style="left: ${leftPx}px;">${i}</div>
                <div class="h-tick major" style="left: ${leftPx}px;"></div>
            `);
        }
        if (i < maxHorizontal) {
            horizontalMarks.push(`<div class="h-tick" style="left: ${(i + 0.25) * PPI}px;"></div>`);
            horizontalMarks.push(`<div class="h-tick half" style="left: ${(i + 0.5) * PPI}px;"></div>`);
            horizontalMarks.push(`<div class="h-tick" style="left: ${(i + 0.75) * PPI}px;"></div>`);
        }
    }

    const designImageSrc = designImageBase64 ? `data:image/png;base64,${designImageBase64}` : '';

    const artworkImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";

    const barcodeText = `*${Math.random().toString(36).substring(2, 12).toUpperCase()}*`;

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Libre+Barcode+128&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 20px 0;
        }
        
        .page {
            width: 210mm;
            min-height: 297mm;
            background: white;
            margin: 0 auto;
            padding: 8mm 10mm;
            position: relative;
            box-sizing: border-box;
            box-shadow: none;
        }
        
        .page-footer {
            position: absolute;
            bottom: 6mm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            color: #666;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .page { margin: 0; border: none; box-shadow: none; }
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
        }
        
        .header-left h1 { font-size: 16px; font-weight: 700; margin-bottom: 1px; }
        .header-right { 
            text-align: right; 
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .barcode { font-family: 'Libre Barcode 128', cursive; font-size: 32px; }
        .rid-box { border: 2px solid #000; padding: 2px 6px; font-weight: 600; font-size: 12px; }
        
        .title {
            text-align: center;
            font-size: 24px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 6px;
            margin-bottom: 15px;
        }
        
        .section-title { 
            font-weight: 800; 
            font-size: 12px; 
            margin-bottom: 8px; 
            border-bottom: 1px solid #ccc; 
            padding-bottom: 1px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: table;
        }
        
        .top-content {
            display: grid;
            grid-template-columns: 1fr 140px;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .design-info {
            display: grid;
            grid-template-columns: 140px 1fr;
            gap: 4px;
            align-items: center;
        }
        
        .info-label { font-weight: 600; font-size: 12px; }
        .info-value { font-size: 12px; }
        
        .artwork-preview-box { text-align: right; }
        .customer-artwork-label { font-weight: 600; font-size: 10px; margin-bottom: 3px; display: block; }
        
        .artwork-preview {
            width: 110px;
            height: 110px;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f9f9f9;
            margin-left: auto;
        }
        
        .artwork-preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .ruler-section { margin-bottom: 25px; position: relative; }
        
        .ruler-area {
            padding: 0;
            border: 2px solid #000;
            min-height: 350px;
            position: relative;
            background: white;
            overflow: hidden;
        }
        
        .vertical-ruler {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 35px;
            width: 35px;
            background: #000;
            color: white;
            z-index: 10;
        }
        
        .corner-block {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 35px;
            height: 35px;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            font-weight: 600;
        }
        
        .corner-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: white; }
        .corner-block::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 1px; background: white; }
        
        .v-tick { position: absolute; right: 0; width: 6px; height: 1px; background: white; }
        .v-tick.half { width: 12px; }
        .v-tick.major { width: 35px; }
        .v-number { position: absolute; left: 4px; transform: translateY(-50%); font-size: 10px; font-weight: 600; color: white; }
        
        .horizontal-ruler {
            position: absolute;
            bottom: 0;
            left: 35px;
            right: 0;
            height: 35px;
            background: #000;
            color: white;
            z-index: 10;
        }
        
        .h-tick { position: absolute; top: 0; width: 1px; height: 6px; background: white; }
        .h-tick.half { height: 12px; }
        .h-tick.major { height: 35px; }
        .h-number { position: absolute; top: 15px; transform: translateX(-50%); margin-left: -10px; font-size: 10px; font-weight: 600; color: white; }
        
        .embroidery-area {
            position: absolute;
            left: 35px;
            bottom: 35px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            background: #ffffff;
            padding: 0;
            overflow: hidden;
        }
        
        .embroidery-placeholder { object-fit: fill; object-position: left bottom; }
        
        .bottom-sections {
            position: absolute;
            bottom: 15mm;
            left: 10mm;
            right: 10mm;
            display: flex;
            flex-direction: column;
            gap: 12px;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }
        
        .approval-section { display: flex; flex-direction: row; gap: 40px; font-size: 12px; margin-bottom: 5px; }
        .checkbox-group { display: flex; align-items: center; gap: 8px; }
        .checkbox { width: 18px; height: 18px; border: 2px solid #000; display: inline-block; }
        .approval-label { font-weight: 700; text-transform: uppercase; font-size: 12px; }
        
        .notes-section { }
        .notes-title { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
        .notes-area { border: 2px solid #000; min-height: 80px; padding: 10px; background: white; }
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Approval Card</title>
    <style>${styles}</style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="header-left"><h1>www.APPROVALSTITCH.com</h1></div>
            <div class="header-right">
                <div class="barcode">${barcodeText}</div>
                <div class="rid-box">${data.designName}</div>
            </div>
        </div>
        
        <div class="title">CUSTOMER APPROVAL CARD</div>
        
        <div class="section-title">Project Info</div>
        <div class="top-content">
            <div class="design-info">
                <div class="info-label">Design Name:</div> <div class="info-value">${data.designName}</div>
                <div class="info-label">Final Size:</div> <div class="info-value">${widthInches}" x ${heightInches}"</div>
                <div class="info-label">Stitch Count:</div> <div class="info-value">${data.stitchCount.toLocaleString()}</div>
                <div class="info-label">Colors:</div> <div class="info-value">${data.colorCount}</div>
            </div>
            <div class="artwork-preview-box">
                <span class="customer-artwork-label">CUSTOMER ARTWORK</span>
                <div class="artwork-preview"><img src="${artworkImageSrc}" alt="Customer Artwork"></div>
            </div>
        </div>
        
        <div class="section-title">Visual Preview</div>
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 350px;">
                <div class="corner-block"><div class="corner-label">inch</div></div>
                <div class="vertical-ruler">${verticalMarks.join('')}</div>
                <div class="horizontal-ruler">${horizontalMarks.join('')}</div>
                <div class="embroidery-area" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px; margin-top: ${0.5 * PPI}px;">
                    ${designImageSrc ? `<img src="${designImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: 100%; height: 100%;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
                </div>
            </div>
        </div>
        
        <div class="bottom-sections">
            <div class="approval-header" style="font-weight: 800; font-size: 13px; text-transform: uppercase;">Customer Final Approval</div>
            <div class="approval-section">
                <div class="checkbox-group"><span class="checkbox"></span><span class="approval-label">APPROVED</span></div>
                <div class="checkbox-group"><span class="checkbox"></span><span class="approval-label">CHANGES NEEDED</span></div>
            </div>
            
            <div class="notes-section">
                <div class="notes-title">Customer Notes & Instructions:</div>
                <div class="notes-area"></div>
            </div>
        </div>
        
        <div class="page-footer">${data.designName} - Page 1/1 - approvalstitch.com</div>
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

try:
    from PIL import Image, ImageOps
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

doc = fitz.open(pdf_path)

# Find the largest image across all pages
largest_image = None
largest_size = 0

for page_num in range(len(doc)):
    page = doc[page_num]
    images = page.get_images()
    
    for img_info in images:
        xref = img_info[0]
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.n >= 5:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            
            # Calculate image size (width * height)
            img_size = pix.width * pix.height
            
            if img_size > largest_size:
                largest_size = img_size
                largest_image = pix
        except:
            continue

if largest_image:
    pix = largest_image
    img_bytes = pix.tobytes("png")
    
    if HAS_PIL:
        img = Image.open(BytesIO(img_bytes))
        img = img.convert("RGB")
        
        # 1. OPTIONAL: Convert near-white background to pure white for cleaner look
        # Only if it's very close to pure white to avoid destroying white design parts
        datas = img.getdata()
        new_data = []
        for item in datas:
            # Absolute white threshold (250 instead of 254 to be more forgiving but still safe)
            if item[0] >= 250 and item[1] >= 250 and item[2] >= 250:
                new_data.append((255, 255, 255))
            else:
                new_data.append(item)
        img.putdata(new_data)
        
        # 2. TRIM WHITESPACE
        # Convert to grayscale
        gray = img.convert('L')
        # Threshold: only absolute white or very near white is background
        threshold = 250
        bw = gray.point(lambda x: 0 if x < threshold else 255, '1')
        # Invert so content is white (to detect bbox), background is black
        bw = ImageOps.invert(bw.convert('L'))
        # Get bounding box of content
        bbox = bw.getbbox()
        
        if bbox:
            img = img.crop(bbox)
        
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        print(base64.b64encode(buffer.read()).decode())
    else:
        # No PIL available, just return the extracted image bytes
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
