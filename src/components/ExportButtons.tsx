import { jsPDF } from "jspdf";
import Papa from "papaparse";
import React from "react";

interface NewsItem {
  title: string;
  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
}

interface Props {
  data: NewsItem[];
}

const ExportButtons: React.FC<Props> = ({ data }) => {
  const exportCSV = () => {
    const csv = Papa.unparse(
      data.map((item) => ({
        Title: item.title,
        Author: item.author || "Unknown",
        Date: new Date(item.publishedAt).toLocaleDateString(),
        URL: item.url,
        Description: item.description,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "news_data.csv");
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("News Articles", 10, 10);

    let y = 20;
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.title}`, 10, y);
      y += 10;
      doc.text(`Author: ${item.author || "Unknown"}`, 10, y);
      y += 10;
      doc.text(`Date: ${new Date(item.publishedAt).toLocaleDateString()}`, 10, y);
      y += 10;
      doc.text(`URL: ${item.url}`, 10, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("news_data.pdf");
  };

  return (
    <div className="flex gap-4 my-4">
      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export CSV
      </button>
      <button
        onClick={exportPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
