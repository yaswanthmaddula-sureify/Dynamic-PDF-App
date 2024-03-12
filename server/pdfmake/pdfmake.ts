import { docDefinition } from "./docDefinition";
import { customTableLayouts } from "./tableLayouts";
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
        },
        Tahoma: {
            normal: 'fonts/Tahoma/tahoma.ttf',
            bold: 'fonts/Tahoma/tahoma.ttf',
            italics: 'fonts/Tahoma/tahoma.ttf',
            bolditalics: 'fonts/Tahoma/tahoma.ttf'
        }
    };
    const pdfPrinter = new pdfMake(fonts);

    // Create a PDF
    return pdfPrinter.createPdfKitDocument(docDefinition, { tableLayouts: customTableLayouts});
}