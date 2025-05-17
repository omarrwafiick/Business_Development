import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

export const exportPDF = (data) => {
  const doc = new jsPDF();

  doc.text('Bedaytak Report', 14, 10);

  if (!data || data.length === 0) {
    doc.text('No data to display.', 14, 20);
    doc.save('bedaytak-report.pdf');
    return;
  } 

  const tableColumn = Object.keys(data[0]);
 
  const tableRows = data.map(item => tableColumn.map(key => item[key]));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("bedaytak-report.pdf");
};

//exportPDF(sampleData);
