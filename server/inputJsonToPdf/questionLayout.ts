import { TableCell } from "pdfmake/interfaces";
import { IQuestionRaw, ResponseOptionType } from "./types";
import { checkedIcon, unCheckedIcon } from "./fontelloIcons";

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

export const renderSingleMultiSelectQnSingleCol = (question: IQuestionRaw): TableCell[] => {
    return [
        {
            // type: 'none',
            separator: ')',
            ol: [
                [
                    question?.question_text || '',
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
            ],
            colSpan: 2,
        },
        ''
    ]
};