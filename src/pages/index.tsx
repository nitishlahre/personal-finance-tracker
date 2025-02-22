import { useState, useEffect } from "react";
import axios from "axios";
import { Transaction } from "../types/Transaction";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const handleTransactionDeleted = (id: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction._id !== id)
    );
  };

  const handleTransactionEdited = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleTransactionUpdated = (updatedTransaction: Transaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === updatedTransaction._id
          ? updatedTransaction
          : transaction
      )
    );
    setSelectedTransaction(undefined);
  };

  return (
    <div className="h-fit min-w-max flex flex-col items-center justify-center py-10 px-4 ">
      <h1 className="text-4xl text-black mb-8 font-bold text-center">
        Personal Finance Tracker
      </h1>

      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        <TransactionForm
          existingTransaction={selectedTransaction}
          onTransactionAdded={handleTransactionAdded}
          onTransactionUpdated={handleTransactionUpdated}
        />

        <TransactionList
          transactions={transactions}
          onTransactionDeleted={handleTransactionDeleted}
          onTransactionEdited={handleTransactionEdited}
        />

        <div className="w-full grid place-content-center">
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
