import { TableCell } from "pdfmake/interfaces";
import { DisplayTypeEnum, IQuestionRaw, LayoutType, QuestionTypeEnum } from "../types";
import { AUTO_LAYOUT, TABLE_LAYOUT } from "./constants";
import { autoLayoutSinlgeMultiSelectQn, getTwoColumnSingleMultiSelectQnCell, getSingleMultiSelectQnSingleColRow } from "./singleMultiSelect";

/**
 * Retrieves the table cells for a given question.
 * 
 * @param question - The question object.
 * @param arrIndex - The index of the question in the array.
 * @param listIndex - The index of the question (optional) for beneficiary/list type questions.
 * @returns An array of table cells or null if the question is not applicable.
 */
const getQnDoubleColRow = (question: IQuestionRaw, arrIndex?: number, listIndex?: number): TableCell[] | null => {

    switch (question.question_type) {
        case QuestionTypeEnum.text:
        case QuestionTypeEnum.number:
        case QuestionTypeEnum.date:
            // Ignore empty responses
            // if (!Boolean(question.response)) {
            //     return null;
            // }
            return [
                question?.question_text || '',
                question?.response?.toString() || ''
            ];

        case QuestionTypeEnum.singleSelect:
        case QuestionTypeEnum.multiSelect:
            // Ignore empty responses
            // if (!Boolean(question.response)) {
            //     return null;
            // }

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
                    const label = listIndex ? `${question.question_text} ${listIndex + 1}` : question.question_text;
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
                                    ...getRowsOfQuestions(listChildQns)
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
                    // if (!Boolean(question.response)) {
                    //     return null;
                    // }
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
 * @param arrIndex - The index of the question in the array.
 * @param listIndex - The index of the question (optional) for beneficiary/list type questions.
 * @returns An array of table cells or null if the question is not applicable.
 */
const getQnSingleColRow = (question: IQuestionRaw, arrIndex?: number, listIndex?: number): TableCell[] | null => {

    switch (question.question_type) {
        case QuestionTypeEnum.text:
        case QuestionTypeEnum.number:
        case QuestionTypeEnum.date:
            // Ignore empty responses
            // if (!Boolean(question.response)) {
            //     return null;
            // }
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
            // if (!Boolean(question.response)) {
            //     return null;
            // }
            return getSingleMultiSelectQnSingleColRow(question, TABLE_LAYOUT, arrIndex);

        case QuestionTypeEnum.label:
        case QuestionTypeEnum.button:
            return null;

        case QuestionTypeEnum.group:
            switch (question.display_type) {
                case DisplayTypeEnum.questions_group:
                case DisplayTypeEnum.beneficiary_list:
                    const label = listIndex ? `${question.question_text} ${listIndex + 1}` : question.question_text;
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
                                    ...getRowsOfQuestions(listChildQns)
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
                    // if (!Boolean(question.response)) {
                    //     return null;
                    // }
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
 * Returns an array of table cells representing a question row based on the provided question and layout type.
 * @param question - The question object.
 * @param layout - The layout type (default: LayoutType.double).
 * @param arrIndex - The array index (optional).
 * @param listIndex - The list index (optional).
 * @returns An array of table cells representing the question row.
 */
export const getQuestionRow = (question: IQuestionRaw, layout: LayoutType = LayoutType.double, arrIndex?: number, listIndex?: number): TableCell[] | null => {
    switch (layout) {
        case LayoutType.single:
            return getQnSingleColRow(question, arrIndex, listIndex);

        case LayoutType.double:
        default:
            return getQnDoubleColRow(question, arrIndex, listIndex);
    }
}

/**
 * Retrieves the table cells for the given questions and layout type.
 * 
 * @param questions - The array of questions.
 * @param layout - The layout type (default: LayoutType.double).
 * @returns An array of table cells.
 */
export const getRowsOfQuestions = (questions: IQuestionRaw[], layout: LayoutType = LayoutType.double): TableCell[][] => {
    const questionCells: TableCell[][] = [];

    questions.forEach((question, arrIndex) => {
        const cell = getQuestionRow(question, layout, arrIndex);

        if (cell) {
            questionCells.push(cell);
        }

        const nestedQuestions = question.questions || [];

        if (nestedQuestions.length > 0 && question.display_type !== DisplayTypeEnum.list) {
            const nestedCells = getRowsOfQuestions(nestedQuestions, layout);
            questionCells.push(...nestedCells);
        }
    })

    return questionCells;
}