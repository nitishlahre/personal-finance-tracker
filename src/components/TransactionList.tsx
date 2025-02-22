import axios from "axios";
import { Transaction } from "../types/Transaction";
import { Button } from "@/components/ui/button";

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionDeleted: (id: string) => void;
  onTransactionEdited: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionDeleted,
  onTransactionEdited,
}) => {
  const handleDelete = async (id: string) => {
    await axios.delete(`/api/transactions/${id}`);
    onTransactionDeleted(id);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Transactions</h2>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center"
          >
            <span>
              {transaction.amount} - {transaction.description} (
              {formatDate(transaction.date)})
            </span>
            <div className="flex gap-2">
              <Button
                onClick={() => onTransactionEdited(transaction)}
                className="bg-blue-500 hover:bg-blue-600 py-1 px-5 rounded text-white"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(transaction._id)}
                className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded text-white"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
