// src/utils/readExcel.js
import * as XLSX from "xlsx";

export const readExcelFile = async (filePath) => {
  const response = await fetch(filePath);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      resolve(jsonData);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(blob);
  });
};
