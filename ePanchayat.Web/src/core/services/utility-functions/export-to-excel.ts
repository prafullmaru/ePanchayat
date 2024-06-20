import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export function exportToExcel(
  data: any[],
  excelFileName: string = 'ePnachayat.xlsx'
): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data'],
  };
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'buffer',
  });

  const parsedData: Blob = new Blob([excelBuffer], {
    type: EXCEL_TYPE,
  });
  FileSaver.saveAs(
    parsedData,
    excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
  );
}
