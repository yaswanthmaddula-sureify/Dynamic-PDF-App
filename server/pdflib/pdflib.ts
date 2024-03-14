import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';

export const getPdfLibDoc = async () => {
    // Create a new PDF document with A4 size
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points (1 point = 1/72 inch)

    // Define table properties
    const tableWidth = 500; // Width of the table
    const columnWidth = tableWidth / 2; // Width of each column
    const rowHeight = 50; // Height of each row
    const borderWidth = 1; // Border width
    const headerColor = rgb(0.8, 0.8, 0.8); // Grey color for the header
    const borderColor = rgb(0.8, 0.8, 0.8); // Grey color for the borders
    const headerTextColor = rgb(0, 0, 0); // Black color for header text
    const padding = 50; // Padding around the page
    const cellLeftPadding = 5; // Cell padding from the left

    // Draw header row with grey fill
    page.drawRectangle({
        x: padding,
        y: 842 - padding - rowHeight, // A4 height - top margin - header height - padding
        width: tableWidth,
        height: rowHeight,
        color: headerColor,
    });

    // Draw column headers
    page.drawText('Column 1', {
        x: padding + borderWidth + cellLeftPadding, // Add borderWidth to avoid overlap with border
        y: 842 - padding - (rowHeight / 2), // Center text vertically
        size: 12,
        color: headerTextColor,
        font: await pdfDoc.embedFont('Helvetica-Bold'), // Use bold font
    });
    page.drawText('Column 2', {
        x: padding + columnWidth + borderWidth + cellLeftPadding,
        y: 842 - padding - (rowHeight / 2),
        size: 12,
        color: headerTextColor,
        font: await pdfDoc.embedFont('Helvetica-Bold'), // Use bold font
    });

    // Draw table borders
    for (let i = 0; i <= 6; i++) {
        const y = 842 - padding - (rowHeight * i); // Calculate y position for each row
        // Draw horizontal borders
        page.drawLine({
            start: { x: padding, y: y },
            end: { x: padding + tableWidth, y: y },
            thickness: borderWidth,
            color: borderColor,
        });
        // Draw vertical borders
        page.drawLine({
            start: { x: padding, y: 842 - padding },
            end: { x: padding, y: 842 - padding - (rowHeight * 6) },
            thickness: borderWidth,
            color: borderColor,
        });
        page.drawLine({
            start: { x: padding + columnWidth, y: 842 - padding },
            end: { x: padding + columnWidth, y: 842 - padding - (rowHeight * 6) },
            thickness: borderWidth,
            color: borderColor,
        });
        page.drawLine({
            start: { x: padding + columnWidth * 2, y: 842 - padding },
            end: { x: padding + columnWidth * 2, y: 842 - padding - (rowHeight * 6) },
            thickness: borderWidth,
            color: borderColor,
        });
    }

    // Add sample data to table cells
    const sampleData = [
        ['Row 1, Cell 1', 'Row 1, Cell 2'],
        ['Row 2, Cell 1', 'Row 2, Cell 2'],
        ['Row 3, Cell 1', 'Row 3, Cell 2'],
        ['Row 4, Cell 1', 'Row 4, Cell 2'],
        ['Row 5, Cell 1', 'Row 5, Cell 2'],
    ];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
            page.drawText(sampleData[i][j], {
                x: padding + (columnWidth * j) + borderWidth + cellLeftPadding, // Add borderWidth to avoid overlap with border
                y: 842 - padding - rowHeight - (rowHeight * (i + 1)) + (rowHeight / 2), // Center text vertically
                size: 12,
            });
        }
    }


    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync('sample.pdf', pdfBytes)

    // Return the PDF document buffer
    return pdfBytes;
}