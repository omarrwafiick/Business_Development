import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (data, fileName = 'bedaytak-report') => {
  if (!data || data.length === 0) {
    console.warn("No data provided for Excel export.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(dataBlob, `${fileName}.xlsx`);
};
