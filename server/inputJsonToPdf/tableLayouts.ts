export const customTableLayouts = {
    filledHeaderWithBorders:
    {
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#cccccc',
        vLineColor: () => '#cccccc',
        fillColor: (rowIndex, node, columnIndex) => rowIndex < node.table.headerRows ? '#cccccc' : null
    },
    vLineTableLayout:
    {
        hLineWidth: () => 0,
        vLineWidth: (i: number, node: any) => i == 1 ? 1 : 0,
        vLineColor: () => '#cccccc',
        paddingLeft: (i: number, node: any) => i == 1 ? 4 : 0,
        paddingRight: (i: number, node: any) => i == 0 ? 4 : 0,
        // paddingTop: () => 0,
        // paddingBottom: () => 0
    }
}