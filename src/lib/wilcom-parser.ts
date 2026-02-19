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
        writeFileSync(tempScriptPath, pythonScript);

        const { execFileSync } = await import('child_process');

        // Use execFileSync to avoid shell interpretation of arguments
        const result = execFileSync('python3', [tempScriptPath, pdfPath], {
            encoding: 'utf-8',
            maxBuffer: 50 * 1024 * 1024,
        });

        return result;
    } catch (error) {
        console.error('Python extraction failed:', error);
        return '';
    } finally {
        // Clean up temp file in finally block to ensure it happens
        try {
            if (existsSync(tempScriptPath)) {
                unlinkSync(tempScriptPath);
            }
        } catch { }
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

    // Parse design name - try common labels
    let designName = '';
    const designMatch = text.match(/(?:Design|Design Name):\s*(.+?)(?:\n|$)/i);
    if (designMatch) {
        designName = designMatch[1].trim();
    }

    // As a fallback, try to find the first line that looks like a title if designName is still empty
    if (!designName) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5);
        if (lines.length > 0) designName = lines[0];
    }

    if (designName) result.designName = designName;

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

    const outputImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : (designImageBase64 ? `data:image/png;base64,${designImageBase64}` : '');
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
            column-gap: 12px;
            row-gap: 2px;
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
        
        .embroidery-placeholder { object-fit: cover; object-position: center; }
        
        .bottom-sections { display: none; }
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
        <div class="section-title" style="margin-top: 15px;">Visual Preview (Scaled)</div>
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 350px;">
                <div class="corner-block"><div class="corner-label">inch</div></div>
                <div class="vertical-ruler">${verticalMarks.join('')}</div>
                <div class="horizontal-ruler">${horizontalMarks.join('')}</div>
                <div class="embroidery-area" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px; margin-top: ${0.5 * PPI}px;">
                    ${outputImageSrc ? `<img src="${outputImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: 100%; height: 100%;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
                </div>
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

    const outputImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : (designImageBase64 ? `data:image/png;base64,${designImageBase64}` : '');

    const artworkImageSrc = artworkImageBase64
        ? `data:image/png;base64,${artworkImageBase64}`
        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";

    const barcodeText = `*${Math.random().toString(36).substring(2, 12).toUpperCase()}*`;

    // Generate color grid HTML (same as operator card)
    const colorGridHtml = data.colors.map(color => `
        <div class="color-cell">
            <div class="color-code" style="background: ${color.hex}; color: ${getContrastColor(color.hex)}">${color.code}</div>
            <div class="color-name">${color.name}</div>
        </div>
    `).join('');

    // Split sequence into rows of 25 (same as operator card)
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
        
        .artwork-preview img { width: 100%; height: 100%; object-fit: contain; object-position: center; }
        
        .color-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px; }
        .color-cell { display: flex; align-items: center; gap: 4px; font-size: 10px; }
        .color-code { padding: 2px 6px; border-radius: 3px; font-weight: 700; font-size: 9px; }
        .color-name { color: #333; max-width: 80px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .color-sequence { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .seq-item { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .seq-circle { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; }
        .seq-number { font-size: 8px; color: #666; }
        
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
        
        .embroidery-placeholder { object-fit: cover; object-position: center; }
        
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
        
        <div class="section-title">Color Grid</div>
        <div class="color-grid">${colorGridHtml}</div>

        <div class="section-title">Visual Preview</div>
        <div class="ruler-section">
            <div class="ruler-area" style="height: ${containerHeight}px; min-height: 350px;">
                <div class="corner-block"><div class="corner-label">inch</div></div>
                <div class="vertical-ruler">${verticalMarks.join('')}</div>
                <div class="horizontal-ruler">${horizontalMarks.join('')}</div>
                <div class="embroidery-area" style="width: ${widthInches * PPI}px; height: ${heightInches * PPI}px; margin-top: ${0.5 * PPI}px;">
                    ${outputImageSrc ? `<img src="${outputImageSrc}" alt="Embroidery Design" class="embroidery-placeholder" style="width: 100%; height: 100%;">` : '<div style="color: #999; font-size: 14px; text-align: center;">Embroidery Design</div>'}
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
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
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
    outputDir: string,
    orderTitle?: string | null,
    customerArtworkPath?: string | null
): Promise<{
    data: WilcomParsedData;
    operatorPdfPath: string;
    customerPdfPath: string;
    designImagePath: string | null;
    artworkImagePath: string | null;
}> {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Parse Wilcom PDF
    const data = await parseWilcomPdf(wilcomPdfPath);

    // If orderTitle is provided and not empty, use it as designName
    if (orderTitle && orderTitle.trim()) {
        data.designName = orderTitle.trim();
    }

    // Extract images using Python helper
    let designImageBase64: string | undefined;
    let artworkImageBase64: string | undefined;

    try {
        const { execFileSync } = await import('child_process');
        const { writeFileSync, unlinkSync, existsSync } = await import('fs');
        const { tmpdir } = await import('os');
        const tempScriptPath = join(tmpdir(), `extract_images_${Date.now()}.py`);

        const pythonScript = `
import fitz
import base64
import sys
import os
import json
import math
from io import BytesIO
from collections import deque

try:
    from PIL import Image, ImageChops, ImageStat
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

def _sample_bg_color(img):
    # Estimate background from corners to remove white/light-gray canvas.
    w, h = img.size
    s = max(6, min(w, h) // 50)
    boxes = [
        (0, 0, s, s),
        (max(0, w - s), 0, w, s),
        (0, max(0, h - s), s, h),
        (max(0, w - s), max(0, h - s), w, h),
    ]
    colors = []
    for b in boxes:
        stat = ImageStat.Stat(img.crop(b))
        colors.append(tuple(int(v) for v in stat.mean[:3]))
    colors.sort(key=lambda c: c[0] + c[1] + c[2])
    return colors[len(colors) // 2]

def process_and_trim(img_bytes, expected_ratio=None):
    if not HAS_PIL:
        return base64.b64encode(img_bytes).decode()
    
    img = Image.open(BytesIO(img_bytes))
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3]) 
        img = background
    else:
        img = img.convert("RGB")
    
    image_ratio = img.width / float(max(1, img.height))
    use_component_mode = (
        expected_ratio is not None
        and expected_ratio > 0
        and (image_ratio < expected_ratio * 0.65 or image_ratio > expected_ratio * 1.45)
    )

    # Robust trim for noisy PDF backgrounds:
    # 1) Build a binary "ink" mask on a downscaled image
    # 2) Keep connected components and union nearby ones (logo + separated text)
    # 3) Map bbox back to original resolution
    scale = 4 if min(img.size) >= 400 else 2
    sw = max(1, img.width // scale)
    sh = max(1, img.height // scale)
    small = img.resize((sw, sh), Image.Resampling.BILINEAR)
    px = small.load()

    mask = [[0] * sw for _ in range(sh)]
    for y in range(sh):
        for x in range(sw):
            r, g, b = px[x, y]
            l = 0.299 * r + 0.587 * g + 0.114 * b
            sat = max(r, g, b) - min(r, g, b)
            if l < 240 or sat > 18:
                mask[y][x] = 1

    visited = [[False] * sw for _ in range(sh)]
    comps = []
    for y in range(sh):
        for x in range(sw):
            if not mask[y][x] or visited[y][x]:
                continue
            q = deque([(x, y)])
            visited[y][x] = True
            area = 0
            minx = maxx = x
            miny = maxy = y
            while q:
                cx, cy = q.popleft()
                area += 1
                if cx < minx: minx = cx
                if cx > maxx: maxx = cx
                if cy < miny: miny = cy
                if cy > maxy: maxy = cy
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < sw and 0 <= ny < sh and mask[ny][nx] and not visited[ny][nx]:
                        visited[ny][nx] = True
                        q.append((nx, ny))

            bw = maxx - minx + 1
            bh = maxy - miny + 1
            if area < 30:
                continue
            # Drop 1px-wide vertical noise lines.
            if bw <= 1 and bh > 20:
                continue
            comps.append((area, minx, miny, maxx, maxy))

    bbox = None
    if comps:
        # Prefer components that do not touch page borders.
        border_margin = 2
        inner = []
        touching = []
        for c in comps:
            _, x0, y0, x1, y1 = c
            touches = x0 <= border_margin or y0 <= border_margin or x1 >= (sw - 1 - border_margin) or y1 >= (sh - 1 - border_margin)
            if touches:
                touching.append(c)
            else:
                inner.append(c)

        candidates = inner if inner else comps

        def score_component(c):
            area, x0, y0, x1, y1 = c
            bw = max(1, x1 - x0 + 1)
            bh = max(1, y1 - y0 + 1)
            ar = bw / bh
            score = float(area)
            # Penalize huge components likely to be page backgrounds/forms
            area_ratio = area / float(max(1, sw * sh))
            if area_ratio > 0.45:
                score *= 0.1
            elif area_ratio > 0.30:
                score *= 0.4
            if expected_ratio and expected_ratio > 0:
                # Favor components close to parsed design aspect ratio.
                ratio_penalty = abs(math.log(max(0.01, ar) / max(0.01, expected_ratio)))
                score /= (1.0 + ratio_penalty * 1.6)
            return score

        candidates.sort(reverse=True, key=score_component)

        def build_union_bbox(seed_component, source_components, neighbor_gap=35):
            _, ux0, uy0, ux1, uy1 = seed_component
            changed = True
            while changed:
                changed = False
                for _, x0, y0, x1, y1 in source_components:
                    if x0 <= ux1 + neighbor_gap and x1 >= ux0 - neighbor_gap and y0 <= uy1 + neighbor_gap and y1 >= uy0 - neighbor_gap:
                        nx0 = min(ux0, x0)
                        ny0 = min(uy0, y0)
                        nx1 = max(ux1, x1)
                        ny1 = max(uy1, y1)
                        if nx0 != ux0 or ny0 != uy0 or nx1 != ux1 or ny1 != uy1:
                            ux0, uy0, ux1, uy1 = nx0, ny0, nx1, ny1
                            changed = True
            return (ux0, uy0, ux1, uy1)

        ux0, uy0, ux1, uy1 = build_union_bbox(candidates[0], candidates)
        candidate_area_ratio = ((ux1 - ux0 + 1) * (uy1 - uy0 + 1)) / float(max(1, sw * sh))

        # Safety fallback: if ratio-based crop is too tiny, use the largest-area component strategy.
        if candidate_area_ratio < 0.02:
            by_area = sorted(comps, reverse=True, key=lambda c: c[0])
            ux0, uy0, ux1, uy1 = build_union_bbox(by_area[0], by_area)

        bbox = (ux0 * scale, uy0 * scale, (ux1 + 1) * scale, (uy1 + 1) * scale)

    # Use legacy trim path for PDFs where source image ratio already matches design ratio well.
    if not use_component_mode:
        bbox = None

    # Fallback to previous method if no component could be detected
    if not bbox:
        bg_color = _sample_bg_color(img)
        bg = Image.new("RGB", img.size, bg_color)
        diff = ImageChops.difference(img, bg).convert("L")
        bg_mask = diff.point(lambda x: 255 if x > 12 else 0, "L")

        gray = img.convert('L')
        ink_mask = gray.point(lambda x: 255 if x < 245 else 0, 'L')
        combined = ImageChops.lighter(bg_mask, ink_mask)
        bbox = combined.getbbox()
    
    if bbox:
        # Add minimal padding for anti-aliased edges.
        w, h = img.size
        new_bbox = (
            max(0, bbox[0] - 1),
            max(0, bbox[1] - 1),
            min(w, bbox[2] + 1),
            min(h, bbox[3] + 1)
        )
        img = img.crop(new_bbox)
    
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode()

wilcom_pdf = sys.argv[1]
customer_artwork = sys.argv[2] if len(sys.argv) > 2 else ""
expected_ratio = None
if len(sys.argv) > 3 and sys.argv[3]:
    try:
        expected_ratio = float(sys.argv[3])
    except:
        expected_ratio = None

results = {}

# 1. Extract design from Wilcom PDF
try:
    doc = fitz.open(wilcom_pdf)
    
    # Strategy: Wilcom PDFs tile the design into multiple embedded images in a grid.
    # We find all images with actual content, compute their union bounding box on the page,
    # and render that region at high resolution to capture the complete design.
    
    page = doc[0]
    infos = page.get_image_info(xrefs=True)
    
    content_bboxes = []
    
    for info in infos:
        xref = info.get("xref", -1)
        bbox = info.get("bbox", [])
        if xref < 0 or len(bbox) < 4:
            continue
        try:
            pix = fitz.Pixmap(doc, xref)
            if pix.n >= 5: pix = fitz.Pixmap(fitz.csRGB, pix)
            total_pixels = pix.width * pix.height
            if total_pixels < 5000:
                continue
            
            # Sample pixels to check for content
            samples = pix.samples
            step = max(1, len(samples) // (50000 * pix.n))
            non_white = 0
            for k in range(0, len(samples), pix.n * step):
                if k + 2 < len(samples):
                    if samples[k] < 250 or samples[k+1] < 250 or samples[k+2] < 250:
                        non_white += 1
            ratio = non_white / max(1, total_pixels // step)
            
            # Only include images with meaningful content (>0.5%)
            if ratio > 0.005:
                content_bboxes.append(bbox)
        except:
            continue
    
    if content_bboxes:
        # Cluster nearby bboxes - design tiles are adjacent, logos are isolated
        # Two bboxes are "nearby" if they overlap or are within 50pt of each other
        clusters = []
        used = [False] * len(content_bboxes)
        
        for i in range(len(content_bboxes)):
            if used[i]:
                continue
            cluster = [content_bboxes[i]]
            used[i] = True
            changed = True
            while changed:
                changed = False
                for j in range(len(content_bboxes)):
                    if used[j]:
                        continue
                    b = content_bboxes[j]
                    # Check if b is near any bbox in the cluster
                    for c in cluster:
                        gap = 50
                        if (b[0] <= c[2] + gap and b[2] >= c[0] - gap and
                            b[1] <= c[3] + gap and b[3] >= c[1] - gap):
                            cluster.append(b)
                            used[j] = True
                            changed = True
                            break
            clusters.append(cluster)
        
        # Pick the cluster with the most images (design tiles)
        best_cluster = max(clusters, key=lambda c: len(c))
        
        # Compute union bounding box of the best cluster
        x0 = min(b[0] for b in best_cluster)
        y0 = min(b[1] for b in best_cluster)
        x1 = max(b[2] for b in best_cluster)
        y1 = max(b[3] for b in best_cluster)
        
        # Add small margin
        margin = 2
        clip = fitz.Rect(x0 - margin, y0 - margin, x1 + margin, y1 + margin)
        clip = clip & page.rect  # Clamp to page
        
        # Render at high resolution (4x for sharp output)
        pix = page.get_pixmap(matrix=fitz.Matrix(4, 4), clip=clip)
        results['design'] = process_and_trim(pix.tobytes("png"), expected_ratio)
    else:
        # Fallback: try vector paths
        paths = page.get_drawings()
        
        if len(paths) > 20: 
            design_rects = []
            page_rect = page.rect
            for p in paths:
                r = p["rect"]
                if r.width < page_rect.width * 0.95 or r.height < page_rect.height * 0.95:
                    design_rects.append(r)
            
            if design_rects:
                union_rect = design_rects[0]
                for r in design_rects[1:]:
                    union_rect |= r
                
                union_rect.x0 -= 5
                union_rect.y0 -= 5
                union_rect.x1 += 5
                union_rect.y1 += 5
                
                pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=union_rect)
                results['design'] = process_and_trim(pix.tobytes("png"), expected_ratio)
            else:
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
                results['design'] = process_and_trim(pix.tobytes("png"), expected_ratio)
        else:
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            results['design'] = process_and_trim(pix.tobytes("png"), expected_ratio)
            
    doc.close()
except Exception as e:
    results['design_error'] = str(e)

# 2. Process customer artwork if provided
if customer_artwork and os.path.exists(customer_artwork):
    try:
        with open(customer_artwork, 'rb') as f:
            results['artwork'] = process_and_trim(f.read(), expected_ratio)
    except Exception as e:
        results['artwork_error'] = str(e)

print(json.dumps(results))
`;

        writeFileSync(tempScriptPath, pythonScript);
        const expectedRatio = data.widthMm > 0 && data.heightMm > 0
            ? (data.widthMm / data.heightMm).toFixed(6)
            : "";
        const pythonArgs = [tempScriptPath, wilcomPdfPath, customerArtworkPath || "", expectedRatio];
        const result = execFileSync('python3', pythonArgs, {
            encoding: 'utf-8',
            maxBuffer: 50 * 1024 * 1024
        });

        try {
            const parsed = JSON.parse(result.trim());
            designImageBase64 = parsed.design;
            artworkImageBase64 = parsed.artwork;
        } catch (e) {
            console.error('Failed to parse Python result:', e);
        }

        if (existsSync(tempScriptPath)) unlinkSync(tempScriptPath);
    } catch (error) {
        console.error('Failed to process images:', error);
    }

    // Save images if extracted
    let designImagePath: string | null = null;
    if (designImageBase64) {
        designImagePath = join(outputDir, `${orderId}_design.png`);
        await writeFile(designImagePath, Buffer.from(designImageBase64, 'base64'));
    }

    let artworkImagePath: string | null = null;
    if (artworkImageBase64) {
        artworkImagePath = join(outputDir, `${orderId}_artwork.png`);
        await writeFile(artworkImagePath, Buffer.from(artworkImageBase64, 'base64'));
    }

    // Generate approval card HTML
    const operatorHtml = generateOperatorApprovalHtml(data, {
        designImageBase64,
        artworkImageBase64
    });
    const customerHtml = generateCustomerApprovalHtml(data, {
        designImageBase64,
        artworkImageBase64
    });

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
        artworkImagePath,
    };
}
