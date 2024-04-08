import { getPdfDoc } from "./pdfmake";
import { getPdfLibDoc } from "./pdflib";
import { getJSPdfDoc } from "./jspdf";
import nationwideJSON from './data/nationwide_input.json'
import { createPdf } from "./inputJsonToPdf/generatePdf";
import { InputJSONType } from "./inputJsonToPdf/types";
import { Content } from "pdfmake/interfaces";


// Import necessary modules
const express = require('express');
var cors = require('cors')
const pdfMake = require('pdfmake');

// Create Express app
const app = express();

app.use(cors());

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

    const impNotices = [
        ['Fraud Statement and Important Notices'],
        [{
            stack: [
                { text: 'Fraud Statement:', bold: true, margin: [0, 0, 0, 4] },
                'Any person who knowingly presents a false statement in an application for insurance may be guilty of a criminal offense and subject to penalties under state law.',
                {
                    text: 'Important Notices:', bold: true, margin: [0, 8, 0, 4]
                },
                'Together with this application, as part of our normal underwriting procedures, you will also be required to complete additional authorizations in order to obtain, use, and/or release your personal information to or from certain third-party information providers (such as MIB, Inc.), including a HIPAA authorization. The types of information covered by these authorizations may include, but is not limited to, personal information, information from credit reports, information regarding your insurability, and health information and medical records. Your authorization will be valid for the time limit, if any, permitted by applicable law in the state where the policy is delivered or issued for delivery.'
            ]
        }]
    ];

    const agreementSignatures = [
        ['Agreement and Signatures'],
        [{
            stack: [
                { text: 'Agreement: I understand and agree that:', bold: true, margin: [0, 4, 0, 0] },
                {
                    ul: [
                        'This application, any amendments to it, and any related medical examination(s) will become a part of the Policy and are the basis of any insurance issued upon this application. ',
                        'The Proposed Insured or Owner has a right to cancel this application at any time by contacting their Financial Professional or Nationwide Life and Annuity Insurance Company (“Nationwide”) in writing. No Financial Professional, medical examiner or other representative of Nationwide may accept risks or make or change any contract; or waive or change any of the Company’s rights or requirements.',
                        ''
                    ]
                },
                {
                    text: '\n I have read this application and agreement and declare that the answers are true and complete to the best of my knowledge and belief. I understand and agree to all its terms.'
                },
                {
                    text: '\n\n'
                },
                {
                    text: 'Signed at_____________________________, on__________________________________'
                },
                {
                    text: '                                State                                                 Date \n\n',
                    preserveLeadingSpaces: true
                },
                {
                    text: 'X_______________________________  X___________________________________________________'
                },
                {
                    text: '         Signature of Proposed Insured            Signature of Owner (if other than Proposed Insured)',
                    preserveLeadingSpaces: true
                }
            ]
        }]
    ];

    const customContent: Content[] = [
        {
            margin: [0, 0, 0, 20],
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    ...impNotices
                ]
            },
            layout: 'filledHeaderWithBorders'
        },
        {
            margin: [0, 0, 0, 20],
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    ...agreementSignatures
                ]
            },
            layout: 'filledHeaderWithBorders'
        }
    ]

    // Create a PDF
    const pdfDoc = createPdf(nationwideJSON as InputJSONType, customContent);

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