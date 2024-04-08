import { getPdfDoc } from "./pdfmake";
import { getPdfLibDoc } from "./pdflib";
import { getJSPdfDoc } from "./jspdf";
import nationwideJSON from './data/nationwide_input.json'
import { createPdf } from "./inputJsonToPdf/generatePdf";
import { InputJSONType } from "./inputJsonToPdf/types";


// Import necessary modules
const express = require('express');
var cors = require('cors')
const pdfMake = require('pdfmake');

// Create Express app
const app = express();

app.use(cors())

// Define a route to generate a PDF
app.get('/pdfmake', (req, res) => {

    // Create a PDF
    const pdfDoc = getPdfDoc();

    // Make sure the browser knows this is a PDF.
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=sample.pdf`);
    res.set('Content-Description: File Transfer');
    res.set('Cache-Control: no-cache');

    pdfDoc.pipe(res);
    pdfDoc.end();
});

app.get('/inputjson-pdf', (req, res) => {

    // Create a PDF
    const pdfDoc = createPdf(nationwideJSON as InputJSONType);

    // Make sure the browser knows this is a PDF.
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=sample.pdf`);
    res.set('Content-Description: File Transfer');
    res.set('Cache-Control: no-cache');

    pdfDoc.pipe(res);
    pdfDoc.end();
});

app.get('/pdflib', async (req, res) => {
    try {
        // Generate the PDF document
        const pdfDoc = await getPdfLibDoc();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=table.pdf');
        res.set('Content-Description: File Transfer');

        // Send the PDF as a download
        res.send(pdfDoc);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.get('/jspdf', (req, res) => {
    try {
        // Generate the PDF document
        const pdfDoc = getJSPdfDoc();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=table.pdf');
        res.set('Content-Description: File Transfer');

        // Send the PDF as a download
        res.send(pdfDoc);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

// Start the server
const PORT = 3090;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});