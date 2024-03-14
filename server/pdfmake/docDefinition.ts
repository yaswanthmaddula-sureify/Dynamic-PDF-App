import { TDocumentDefinitions } from "pdfmake/interfaces";

const checkedIcon = { text: '', style: 'icon' };
const unCheckedIcon = { text: '', style: 'icon' };

const planInformation = [
    [{ text: 'Plan Information', colSpan: 2, style: 'tableHeader' }, ''],
    ['Product Name', ''],
    ['Coverage Amount', ''],
    ['Premium Amount', ''],
    ['Premium Mode', { text: [unCheckedIcon, ' Single-Pay  ', unCheckedIcon, ' Monthly  ', unCheckedIcon, ' Quarterly  ', checkedIcon, ' Semi-Annual  ', unCheckedIcon, ' Annual'] }],
    ['Paid by',
        {
            text: [
                { text: [checkedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false },
                { text: [unCheckedIcon, ' Single-Pay  '], noWrap: false }
            ]
        }
    ],
    ['Are you a U.S. Citizen or a Permanent Green Card (10 year)holder and currently residing in the United States?', '']
];

const personalAndMedicalHistory = [
    [{ text: 'Proposed Insured: Personal & Medical History', colSpan: 2, style: 'tableHeader' }, ''],
    ['Current Height', ''],
    ['Current Weight', ''],
    [{
        separator: ')',
        ol: [
            'When did you last vape, use tobacco, or use nicotine products of any kind?',
            {
                margin: [0, 5, 0, 0],
                type: 'none',
                ul: [
                    { text: [unCheckedIcon, ' Within the last 12 months   ', checkedIcon, ' 1–2 years ago   ', unCheckedIcon, ' 2-3 years ago'] },
                    { text: [unCheckedIcon, ' 3-5 years ago   ', unCheckedIcon, ' More than 5 years ago   ', unCheckedIcon, ' Never used'] }
                ]
            },
            {
                text: 'In the last 5 years, have you had any of the following driving violations? (Select all that apply)',
                margin: [0, 10, 0, 0]
            },
            {
                margin: [0, 5, 0, 0],
                type: 'none',
                ul: [
                    { text: [checkedIcon, " Revoked driver's license"] },
                    { text: [unCheckedIcon, " Suspended driver's license"] },
                    { text: [unCheckedIcon, " Plead guilty to or been convicted of reckless driving"] },
                    { text: [unCheckedIcon, " Plead guilty to or convicted of driving while intoxicated with drugs or alcohol"] },
                    { text: [unCheckedIcon, " Plead guilty to or convicted of driving under the influence of any drug or alcohol"] },
                    { text: [unCheckedIcon, " None of the above"] },
                ]
            },
            {
                text: ['In the last 5 years, have you been diagnosed or treated by a medical professional for any of the following?', { text: '(Select all that apply)', italics: true }],
                margin: [0, 10, 0, 0]
            },
            {
                margin: [0, 5, 0, 0],
                type: 'none',
                ul: [
                    { text: [unCheckedIcon, " Amyotrophic Lateral Sclerosis (ALS)"] },
                    { text: [checkedIcon, " Parkinson’s Disease "] },
                    { text: [unCheckedIcon, " Multiple Sclerosis"] },
                    { text: [unCheckedIcon, " Muscular Dystrophy"] },
                    { text: [unCheckedIcon, " Alzheimer’s disease"] },
                    { text: [unCheckedIcon, " Dementia"] },
                    { text: [unCheckedIcon, " None of the above"] }
                ]
            },
        ],
        colSpan: 2,
    }],
    [{
        stack: [
            'List all contracts that will be replaced',
            {
                type: 'none', ul: [
                    'Company',
                    'Policy Number',
                    'Coverage Amount',
                    'Year Issued',
                    '1035 Exchange'
                ]
            }
        ]
    }, '']
];

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

const content = [
    // { text: 'Page 1 Content', fontSize: 20, pageBreak: 'after' },
    {
        margin: [0, 0, 0, 5],
        columns: [
            {
                image: 'images/Nationwide-logo.png', // Replace 'logo.png' with the path to your logo image
                width: 155 // Adjust the width of the logo as needed
            },
            {
                stack: [
                    { text: 'Application for Individual Life Insurance', fontSize: 14 },
                    { text: 'Nationwide Life & Annuity Insurance Company', fontSize: 14 },
                    { text: 'PO Box 182835, Columbus, OH 43218-2835', fontSize: 10, margin: [0, 5, 0, 0] },
                    { text: 'Fax: 1-888-677-7393 • www.nationwide.com', fontSize: 10 }
                ],
                alignment: 'right',
                margin: [0, 10, 0, 0] // Adjust top margin as needed
            }
        ],
        pageBreak: 'before'
    }
];

// Define number of pages and duplicate data
const numPages = 20;
const repeatedContent = Array(numPages).fill(content);


export const docDefinition: TDocumentDefinitions = {
    footer: (currentPage, pageCount) => ({
        margin: [38, 4, 38, 0],
        columns: [
            'ICC24-LAAA-0138',
            { text: `${currentPage.toString()} of ${pageCount}`, alignment: 'center' },
            { text: '(01/2024)', alignment: 'right' }
        ]
    }),
    content: [
        {
            margin: [0, 0, 0, 5],
            columns: [
                {
                    image: 'images/Nationwide-logo.png', // Replace 'logo.png' with the path to your logo image
                    width: 155 // Adjust the width of the logo as needed
                },
                {
                    stack: [
                        { text: 'Application for Individual Life Insurance', fontSize: 14 },
                        { text: 'Nationwide Life & Annuity Insurance Company', fontSize: 14 },
                        { text: 'PO Box 182835, Columbus, OH 43218-2835', fontSize: 10, margin: [0, 5, 0, 0] },
                        { text: 'Fax: 1-888-677-7393 • www.nationwide.com', fontSize: 10 }
                    ],
                    alignment: 'right',
                    margin: [0, 10, 0, 0] // Adjust top margin as needed
                }
            ]
        },
        {
            margin: [0, 0, 0, 400],
            table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: [
                    ...planInformation
                ]
            },
            layout: 'filledHeaderWithBorders'
        },
        {
            margin: [0, 0, 0, 20],
            table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: [
                    ...personalAndMedicalHistory
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
        },
        {
            text: [
                { text: 'There will be a blank line after this. But if i add more text like this then lets see the wrapping ' },
                { text: '_______________' },
                { text: 'Signature here', relativePosition: { x: 0, y: 0 } },
                { text: 'and this should be after the blank line.' },
            ],
            margin: [0, 0, 0, 10] // Add bottom margin to create space between text
        },
        ...repeatedContent.flatMap(pageContent => [
            // { text: 'Header', fontSize: 24, margin: [0, 0, 0, 20] }, // Example header on each page
            ...pageContent
        ])
    ],
    defaultStyle: {
        // font: 'Tahoma',
        fontSize: 10
    },
    styles: {
        tableHeader: {
            bold: true,
        },
        icon: { font: 'Fontello' }
    }
};