const planInformation = [
    [{ text: 'Plan Information', colSpan: 2, style: 'tableHeader' }, ''],
    ['Product Name', ''],
    ['Coverage Amount', ''],
    ['Premium Amount', ''],
    ['Premium Mode', { text: '\u2610 Single-Pay   Monthly   Quarterly   Semi-Annual   Annual' }],
    ['Paid by',
        {
            text: [
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false },
                { text: '\u2610 Single-Pay  ', noWrap: false }
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
                    ' Within the last 12 months   1–2 years ago   2-3 years ago',
                    ' 3-5 years ago   More than 5 years ago   Never used'
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
                    " Revoked driver's license",
                    " Suspended driver's license",
                    " Plead guilty to or been convicted of reckless driving",
                    " Plead guilty to or convicted of driving while intoxicated with drugs or alcohol",
                    " Plead guilty to or convicted of driving under the influence of any drug or alcohol",
                    " None of the above"
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
                    " Amyotrophic Lateral Sclerosis (ALS)",
                    " Parkinson’s Disease ",
                    " Multiple Sclerosis",
                    " Muscular Dystrophy",
                    " Alzheimer’s disease",
                    " Dementia",
                    " None of the above"
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


export const docDefinition = {
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
            text: [
                'This is a blank line:',
                { text: '\n\n', lineHeight: 1 }, // Add blank line with line break
                'Fill in your information here:'
            ],
            margin: [0, 0, 0, 10] // Add bottom margin to create space between text
        }
    ],
    defaultStyle: {
        font: 'Tahoma',
        fontSize: 10
    },
    styles: {
        tableHeader: {
            bold: true,
        }
    }
};