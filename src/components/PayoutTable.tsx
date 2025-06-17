import React from "react";

interface NewsItem {
  title: string;
  author: string;
}

interface Props {
  data: NewsItem[];
  rate: number;
}

const PayoutTable: React.FC<Props> = ({ data, rate }) => {
  const authorMap: { [author: string]: number } = {};

  data.forEach((item) => {
    const author = item.author || "Unknown";
    authorMap[author] = (authorMap[author] || 0) + 1;
  });

  const authors = Object.entries(authorMap);

  return (
    <div className="bg-white p-4 rounded shadow mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Payout Details</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Article Count</th>
            <th className="p-2 border">Total Payout</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(([author, count]) => (
            <tr key={author}>
              <td className="p-2 border">{author}</td>
              <td className="p-2 border">{count}</td>
              <td className="p-2 border">${(count * rate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutTable;
