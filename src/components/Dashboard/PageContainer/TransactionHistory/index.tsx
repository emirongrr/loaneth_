import React, { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="dark:bg-slate-900 shadow-3xl rounded-[12px] text-white dark:text-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <nav className="flex items-center justify-between">
          <div className="flex -space-x-px">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 border rounded-l-md border-gray-300 text-sm font-medium ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-700"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                    currentPage === page ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(transactions.length / transactionsPerPage)}
              className={`px-3 py-2 border rounded-r-md border-gray-300 text-sm font-medium ${
                currentPage === Math.ceil(transactions.length / transactionsPerPage)
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-500 hover:text-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TransactionTable;
