import PdfPrinter from "pdfmake";
import { customTableLayouts } from "./tableLayouts";
import { Content, DynamicContent, TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import { DisplayTypeEnum, IQuestionRaw, InputJSONType, LayoutType } from "./types";
import { getQuestionRow, getRowsOfQuestions } from "./questionLayout";
import { TABLE_LAYOUT } from "./constants";

/**
 * Creates the header configuration for the PDF document.
 * @returns {Object} The header configuration object.
 */
const createHeader = (): Content => {
    return {
        // Header
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
    }
}

/**
 * Creates a footer function for PDF generation.
 * @param leftText The text to be displayed on the left side of the footer. Default value is ''.
 * @param rightText The text to be displayed on the right side of the footer. Default value is ''.
 * @returns A function that generates the footer for each page of the PDF.
 */
const createFooter = (leftText = 'ICC24-LAAA-0138', rightText = '(01/2024)'): Content | DynamicContent | undefined => {
    return (currentPage, pageCount) => ({
        margin: [38, 4, 38, 0],
        columns: [
            leftText,
            { text: `${currentPage.toString()} of ${pageCount}`, alignment: 'center' },
            { text: rightText, alignment: 'right' }
        ]
    });
}

/**
 * Generates a group table with the given body and layout.
 * @param body - The table cells to be included in the table body.
 * @param layout - The layout type of the table. Defaults to LayoutType.double.
 * @returns The generated group table content.
 */
const getGroupTable = (body: TableCell[][], layout: LayoutType = LayoutType.double): Content => {
    return {
        margin: [0, 0, 0, 20],
        table: {
            headerRows: 1,
            widths: layout === 'single' ? ['*'] : ['*', '*'],
            body: body
        },
        layout: layout === 'single' ? 'filledHeaderWithOuterBorders' : 'filledHeaderWithBorders'
    }
}

/**
 * Retrieves the content for groups in a PDF document.
 * 
 * @param groups - An array of raw question objects representing groups.
 * @returns An array of Content objects representing the groups' content in the PDF document.
 */
const getGroupsContent = (groups: IQuestionRaw[]): Content[] => {

    return groups.reduce((prevContent, group) => {
        const questions = group.questions || [];

        if (questions[0].display_type === DisplayTypeEnum.beneficiary_list) {
            const beneficiaryTables: Content[] = questions[0].questions.map((beneficiaryQns, listIndex) => {
                const body: TableCell[][] = [
                    getQuestionRow(questions[0], TABLE_LAYOUT, 0, listIndex) || ['', '']
                ];
                const questionCells = getRowsOfQuestions(beneficiaryQns as unknown as IQuestionRaw[], TABLE_LAYOUT);

                body.push(...questionCells);

                return getGroupTable(body, TABLE_LAYOUT);
            })



            return [...prevContent, ...beneficiaryTables];
        }

        const body: TableCell[][] = [
            getQuestionRow(group, TABLE_LAYOUT) || ['']
        ];

        const questionCells = getRowsOfQuestions(questions, TABLE_LAYOUT);

        body.push(...questionCells);

        return [...prevContent, getGroupTable(body, TABLE_LAYOUT)]
    }, [] as Content[])
}

/**
 * Creates the content for the PDF based on the input JSON.
 * @param inputJson The input JSON data.
 * @returns The content for the PDF.
 */
const createContent = (inputJson: InputJSONType): Content[] => {

    const breadcrumbs = inputJson.data.questionnaire.questions;

    const content: Content = breadcrumbs.reduce((prevContent, breadcrumb) => {
        const groups = breadcrumb.questions || [];

        const content: Content[] = getGroupsContent(groups);

        return [...prevContent, ...content]
    }, [] as Content[])

    return [
        createHeader(),
        ...content
    ]
}

/**
 * Returns the document definition object for generating a PDF.
 * @param inputJson - The input JSON data.
 * @returns The document definition object.
 */
const getDocDefinition = (inputJson: InputJSONType, customDocContent: Content[] = []): TDocumentDefinitions => {
    return {
        content: [...createContent(inputJson), ...customDocContent],
        footer: createFooter('ICC24-LAAA-0138', '(01/2024)'),
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
    }
}


/**
 * Creates a PDF document based on the input JSON.
 * @param inputJson The input JSON data.
 * @returns The PDF document.
 */
export function createPdf(inputJson: InputJSONType, customDocContent: Content[] = []) {

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
        },
        Fontello: {
            normal: 'fonts/Fontello/fontello.ttf',
            bold: 'fonts/Fontello/fontello.ttf',
            italics: 'fonts/Fontello/fontello.ttf',
            bolditalics: 'fonts/Fontello/fontello.ttf'
        }
    };

    const pdfPrinter = new PdfPrinter(fonts);

    const docDefinition = getDocDefinition(inputJson, customDocContent);

    // Create a PDF
    return pdfPrinter.createPdfKitDocument(docDefinition, { tableLayouts: customTableLayouts });
}