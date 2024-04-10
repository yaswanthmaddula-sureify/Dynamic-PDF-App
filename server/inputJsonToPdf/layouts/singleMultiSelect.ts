import { TableCell } from "pdfmake/interfaces";
import { IQuestionRaw, LayoutType, ResponseOptionType } from "../types";
import { checkedIcon, unCheckedIcon } from "../fontelloIcons";

/**
 * Maps the selected options from the user's response to a TableCell array.
 * 
 * @param question - The question object containing the user's response.
 * @returns An array of TableCell objects representing the selected options, or null if the user's response is invalid.
 */
export const mapOnlySelectedOptions = (question: IQuestionRaw): TableCell[] | null => {
    const userResponse = question.response;

    if (userResponse === null || userResponse === undefined) {
        return null;
    }

    if (Array.isArray(userResponse)) {
        const selectedOptions = userResponse.map((response) => {
            return { text: [checkedIcon, ` ${response.label}   `], noWrap: false }
        })

        return [question?.question_text || '', { text: selectedOptions }]
    }

    if (typeof userResponse === 'object') {
        return [question?.question_text || '', { text: [checkedIcon, ` ${userResponse.label}   `] }]
    }

    return null;
};

/**
 * Determines if the given option is selected in the question's response.
 * @param question - The question object.
 * @param option - The option to check for selection.
 * @returns True if the option is selected, false otherwise.
 */
const getIsOptionsSelected = (question: IQuestionRaw, option: ResponseOptionType): boolean => {
    const userResponse = question.response;

    if (userResponse === null) {
        return false;
    }

    if (Array.isArray(userResponse)) {
        return userResponse.some(resp => resp.id === option.id);
    }

    if (typeof userResponse === 'object') {
        return userResponse.id === option.id;
    }

    return false
};

/**
 * Renders a single or multi-select question with a single column layout in both single and double column layouts.
 * 
 * @param question - The question object.
 * @param layout - The layout type (default: LayoutType.double).
 * @param arrIndex - The array index (optional).
 * @returns An array of TableCell objects representing the rendered question.
 */
export const getSingleMultiSelectQnSingleColRow = (question: IQuestionRaw, layout: LayoutType = LayoutType.double, arrIndex?: number): TableCell[] => {
    switch (layout) {
        case LayoutType.single:
            return [{
                margin: [0, 5, 0, 0],
                stack: [
                    `${(arrIndex ?? 0) + 1}) ${question?.question_text || ''}`,
                    {
                        margin: [0, 5, 0, 0],
                        type: 'none',
                        ul: question.response_options.map(option => {
                            const isSelected = getIsOptionsSelected(question, option);

                            const icon = isSelected ? checkedIcon : unCheckedIcon;

                            return { margin: [0, 5, 0, 0], text: [icon, ` ${option.label}   `], noWrap: false }
                        })
                    }
                ]
            }];

        case LayoutType.double:

        default:
            return [
                {
                    margin: [0, 5, 0, 0],
                    stack: [
                        question?.question_text || '',
                        {
                            margin: [2, 2, 0, 0],
                            type: 'none',
                            ul: question.response_options.map(option => {
                                const isSelected = getIsOptionsSelected(question, option);

                                const icon = isSelected ? checkedIcon : unCheckedIcon;

                                return { margin: [0, 5, 0, 0], text: [icon, ` ${option.label}   `], noWrap: false }
                            })
                        }
                    ],
                    colSpan: 2,
                },
                ''
            ];
    }
};

/**
 * Returns an array of table cells for a two-column single/multi-select question.
 * @param question - The question object.
 * @returns An array of table cells.
 */
export const getTwoColumnSingleMultiSelectQnCell = (question: IQuestionRaw): TableCell[] => {
    return [
        question?.question_text || '',
        {
            text: question.response_options.map(option => {
                const isSelected = getIsOptionsSelected(question, option);

                const icon = isSelected ? checkedIcon : unCheckedIcon;

                return { text: [icon, ` ${option.label}   `], noWrap: false }
            })
        }
    ];
}

/**
 * Auto layout function for single and multi-select questions.
 * 
 * @param question - The question object.
 * @returns An array of table cells or null.
 */
export const autoLayoutSinlgeMultiSelectQn = (question: IQuestionRaw): TableCell[] | null => {
    const charCount = question?.question_text?.length || 0;
    const responseOptionsCount = question.response_options.length;

    if (charCount < 114 && responseOptionsCount < 5) {
        return getTwoColumnSingleMultiSelectQnCell(question);
    }

    if (charCount < 114 && responseOptionsCount >= 5) {
        return mapOnlySelectedOptions(question);
    }

    return getSingleMultiSelectQnSingleColRow(question);
}
