import PdfPrinter from "pdfmake";
import { customTableLayouts } from "./tableLayouts";
import { Content, DynamicContent, TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import { DisplayTypeEnum, IQuestionRaw, InputJSONType, LayoutType, QuestionTypeEnum, ResponseOptionType } from "./types";
import { autoLayoutSinlgeMultiSelectQn, getTwoColumnSingleMultiSelectQnCell, renderSingleMultiSelectQnSingleCol } from "./questionLayout";

const TABLE_LAYOUT: LayoutType = LayoutType.double as LayoutType;
const AUTO_LAYOUT = false;

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
 * Retrieves the table cells for a given question.
 * 
 * @param question - The question object.
 * @param index - The index of the question (optional) for beneficiary/list type questions.
 * @param arrIndex - The index of the question in the array.
 * @returns An array of table cells or null if the question is not applicable.
 */
const getQuestionCell = (question: IQuestionRaw, index: number | undefined = undefined, arrIndex?: number): TableCell[] | null => {

    switch (question.question_type) {
        case QuestionTypeEnum.text:
        case QuestionTypeEnum.number:
        case QuestionTypeEnum.date:
            // Ignore empty responses
            if (!Boolean(question.response)) {
                return null;
            }
            return [
                question?.question_text || '',
                question?.response?.toString() || ''
            ];

        case QuestionTypeEnum.singleSelect:
        case QuestionTypeEnum.multiSelect:
            // Ignore empty responses
            if (!Boolean(question.response)) {
                return null;
            }

            if (AUTO_LAYOUT) {
                return autoLayoutSinlgeMultiSelectQn(question);
            }

            return getTwoColumnSingleMultiSelectQnCell(question);


        case QuestionTypeEnum.label:
        case QuestionTypeEnum.button:
            return null;

        case QuestionTypeEnum.group:
            switch (question.display_type) {
                case DisplayTypeEnum.questions_group:
                case DisplayTypeEnum.beneficiary_list:
                    const label = index ? `${question.question_text} ${index}` : question.question_text;
                    return [
                        { text: label, colSpan: 2, style: 'tableHeader' },
                        ''
                    ]

                case DisplayTypeEnum.list:
                    const listQuestions = (question.questions || []) as unknown as IQuestionRaw[][];
                    const nestedTables = listQuestions.map(listChildQns => (
                        {
                            // Nested table definition
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [`${question.question_text}`, ''],
                                    ...getQuestionsCells(listChildQns)
                                ]
                            },
                            layout: 'vLineTableLayout',
                            colSpan: 2 // Span the nested table across both columns
                        }
                    ))

                    return [{
                        stack: nestedTables,
                        colSpan: 2
                    }, '']

                case DisplayTypeEnum.accordion:
                case DisplayTypeEnum.address_group:

                default:
                    // Ignore empty responses
                    if (!Boolean(question.response)) {
                        return null;
                    }
                    return [
                        { text: question.question_text, colSpan: 2, style: 'tableHeader' },
                        ''
                    ]
            }

        default:
            console.log('I am the defaulter', question);
            return [
                `I am the defaulter`,
                question?.response?.toString() || ''
            ]
    }
}

/**
 * Generates an array of single column table cells based on the given question.
 * 
 * @param question - The question object.
 * @param index - The index of the question.
 * @param arrIndex - The index of the question in the array.
 * @returns An array of table cells or null if the question is not applicable.
 */
const getQuestionCellSingle = (question: IQuestionRaw, index: number | undefined = undefined, arrIndex?: number): TableCell[] | null => {

    switch (question.question_type) {
        case QuestionTypeEnum.text:
        case QuestionTypeEnum.number:
        case QuestionTypeEnum.date:
            // Ignore empty responses
            if (!Boolean(question.response)) {
                return null;
            }
            return [{
                margin: [0, 5, 0, 0],
                stack: [
                    `${(arrIndex ?? 0) + 1}) ${question?.question_text || ''}`,
                    {
                        type: 'none',
                        ul: [
                            question?.response?.toString() || ''
                        ]
                    }
                ]
            }];

        case QuestionTypeEnum.singleSelect:
        case QuestionTypeEnum.multiSelect:
            // Ignore empty responses
            if (!Boolean(question.response)) {
                return null;
            }
            return renderSingleMultiSelectQnSingleCol(question, TABLE_LAYOUT, arrIndex);

        case QuestionTypeEnum.label:
        case QuestionTypeEnum.button:
            return null;

        case QuestionTypeEnum.group:
            switch (question.display_type) {
                case DisplayTypeEnum.questions_group:
                case DisplayTypeEnum.beneficiary_list:
                    const label = index ? `${question.question_text} ${index}` : question.question_text;
                    return [
                        { text: label, style: 'tableHeader' }
                    ]

                case DisplayTypeEnum.list:
                    const listQuestions = (question.questions || []) as unknown as IQuestionRaw[][];
                    const nestedTables = listQuestions.map(listChildQns => (
                        {
                            // Nested table definition
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [`${question.question_text}`, ''],
                                    ...getQuestionsCells(listChildQns)
                                ]
                            },
                            layout: 'vLineTableLayout',
                        }
                    ))

                    return [{
                        stack: nestedTables
                    }]

                case DisplayTypeEnum.accordion:
                case DisplayTypeEnum.address_group:

                default:
                    // Ignore empty responses
                    if (!Boolean(question.response)) {
                        return null;
                    }
                    return [
                        { text: question.question_text, style: 'tableHeader' }
                    ]
            }

        default:
            console.log('I am the defaulter', question);
            return [
                `I am the defaulter`
            ]
    }
}

/**
 * Retrieves the table cells for the given questions and layout type.
 * 
 * @param questions - The array of questions.
 * @param layout - The layout type (default: LayoutType.double).
 * @returns An array of table cells.
 */
const getQuestionsCells = (questions: IQuestionRaw[], layout: LayoutType = LayoutType.double): TableCell[][] => {
    const questionCells: TableCell[][] = [];

    const getTableRow = layout === LayoutType.single ? getQuestionCellSingle : getQuestionCell;

    questions.forEach((question, arrIndex) => {
        const cell = getTableRow(question, undefined, arrIndex);

        if (cell) {
            questionCells.push(cell);
        }

        const nestedQuestions = question.questions || [];

        if (nestedQuestions.length > 0 && question.display_type !== DisplayTypeEnum.list) {
            const nestedCells = getQuestionsCells(nestedQuestions, layout);
            questionCells.push(...nestedCells);
        }
    })

    return questionCells;
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

    const getTableRow = TABLE_LAYOUT == LayoutType.single ? getQuestionCellSingle : getQuestionCell;

    return groups.reduce((prevContent, group) => {
        const questions = group.questions || [];

        if (questions[0].display_type === DisplayTypeEnum.beneficiary_list) {
            const beneficiaryTables: Content[] = questions[0].questions.map((beneficiaryQns, index) => {
                const body: TableCell[][] = [
                    getTableRow(questions[0], index + 1) || ['', '']
                ];
                const questionCells = getQuestionsCells(beneficiaryQns as unknown as IQuestionRaw[], TABLE_LAYOUT);

                body.push(...questionCells);

                return getGroupTable(body, TABLE_LAYOUT);
            })



            return [...prevContent, ...beneficiaryTables];
        }

        const body: TableCell[][] = [
            getTableRow(group) || ['']
        ];

        const questionCells = getQuestionsCells(questions, TABLE_LAYOUT);

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