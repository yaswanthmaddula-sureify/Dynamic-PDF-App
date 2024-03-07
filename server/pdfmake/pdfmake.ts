import { docDefinition } from "./docDefinition";
const pdfMake = require('pdfmake');

export const getPdfDoc = () => {
    const fileName = 'download.pdf';

    // Define font files
    const fonts = {
        Roboto: {
            normal: 'fonts/Roboto/Roboto-Regular.ttf',
            bold: 'fonts/Roboto/Roboto-Medium.ttf',
            italics: 'fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };
    const pdfPrinter = new pdfMake(fonts);

    // Create a PDF
    return pdfPrinter.createPdfKitDocument(docDefinition);
}