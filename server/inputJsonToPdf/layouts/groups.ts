import { Content, TableCell } from "pdfmake/interfaces";
import { DisplayTypeEnum, IQuestionRaw, LayoutType } from "../types";
import { TABLE_LAYOUT } from "./constants";
import { getQuestionRow, getRowsOfQuestions } from "./questions";

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
            widths: layout === LayoutType.single ? ['*'] : ['*', '*'],
            body: body
        },
        layout: layout === LayoutType.single ? 'filledHeaderWithOuterBorders' : 'filledHeaderWithBorders'
    }
}

/**
 * Retrieves the content for groups in a PDF document.
 * 
 * @param groups - An array of raw question objects representing groups.
 * @returns An array of Content objects representing the groups' content in the PDF document.
 */
export const getGroupsContent = (groups: IQuestionRaw[]): Content[] => {

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