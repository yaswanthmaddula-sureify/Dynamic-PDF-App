import { getPdfDoc } from "./pdfmake";

// Import necessary modules
const express = require('express');
var cors = require('cors')
const pdfMake = require('pdfmake');

// Create Express app
const app = express();

app.use(cors())

// Define a route to generate a PDF
app.get('/pdfmake', (req, res) => {

    // const fileName = 'download.pdf';

    // // Create a document definition for the PDF
    // const docDefinition = {
    //     content: [
    //         { text: 'Hello, World!', fontSize: 24 }
    //     ]
    // };

    // // Define font files
    // const fonts = {
    //     Roboto: {
    //         normal: 'fonts/Roboto/Roboto-Regular.ttf',
    //         bold: 'fonts/Roboto/Roboto-Medium.ttf',
    //         italics: 'fonts/Roboto/Roboto-Italic.ttf',
    //         bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    //     }
    // };
    // const pdfPrinter = new pdfMake(fonts);

    // Create a PDF
    const pdfDoc = getPdfDoc();

    // Make sure the browser knows this is a PDF.
    res.set('Content-Type', 'application/pdf');
    // res.set('Content-Disposition', `attachment; filename=${fileName}`);
    res.set('Content-Description: File Transfer');
    res.set('Cache-Control: no-cache');

    pdfDoc.pipe(res);
    pdfDoc.end();
});

// Start the server
const PORT = 3090;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});