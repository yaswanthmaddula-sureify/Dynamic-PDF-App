import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

export const getJSPdfDoc = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();


    autoTable(doc, {
        // head: [['Logo', 'Text']], // Header row
        body: [
            [
                { content: '', rowSpan: 2, colSpan: 1 },
                { content: 'Application for Individual Life Insurance\nNationwide Life & Annuity Insurance Company', styles: { fontSize: 14 } },
            ],
            [
                { content: 'PO Box 182835, Columbus, OH 43218-2835\n Fax: 1-888-677-7393 • www.nationwide.com', styles: { fontSize: 10 } },
            ]
        ],
        theme: 'plain', // Apply grid theme for borders
        bodyStyles: {
            textColor: [0, 0, 0], // Black color for text
        },
        columnStyles: {
            1: {
                halign: 'right'
            },
        },
        didDrawCell: (data) => {
            // if (data.section === 'body' && data.column.index === 0) {
                // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
                doc.addImage('images/Nationwide-logo.jpg', 'JPEG', data.cell.x + 2, data.cell.y + 2, 200, 200)
            // }
        }
    });

    // Add a table using js-autotable
    const tableData = [
        ['Name', 'Age', 'Country'],
        ['John Doe', 30, 'USA'],
        ['Jane Doe', 28, 'UK'],
        ['Bob Smith', 35, 'Canada'],
    ];
    autoTable(doc, {
        head: [tableData[0]], body: tableData.slice(1), theme: 'grid', // Apply grid theme for borders
        headStyles: {
            fillColor: [192, 192, 192], // Grey color for header
            textColor: [0, 0, 0], // Black color for text
            fontStyle: 'bold', // Bold font style
        },
        styles: {
            textColor: [0, 0, 0], // Black color for text
        }
    });

    // Save the PDF as a buffer
    const pdfBuffer = doc.output();

    return pdfBuffer;
}