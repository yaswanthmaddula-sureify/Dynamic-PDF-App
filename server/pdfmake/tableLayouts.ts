export const customTableLayouts = {
    filledHeaderWithBorders:
    {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#cccccc',
        vLineColor: () => '#cccccc',
        fillColor: (rowIndex, node, columnIndex) => rowIndex < node.table.headerRows ? '#cccccc' : null
    }

}