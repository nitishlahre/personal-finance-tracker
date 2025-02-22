import { useState, useEffect } from "react";
import axios from "axios";
import { Transaction } from "../types/Transaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TransactionFormProps {
  existingTransaction?: Transaction;
  onTransactionAdded: (newTransaction: Transaction) => void;
  onTransactionUpdated: (updatedTransaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  existingTransaction,
  onTransactionAdded,
  onTransactionUpdated,
}) => {
  const [amount, setAmount] = useState<number | string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (existingTransaction) {
      setAmount(existingTransaction.amount);
      setDate(
        existingTransaction.date
          ? new Date(existingTransaction.date)
          : new Date()
      );
      setDescription(existingTransaction.description);
    }
  }, [existingTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !description) {
      setError("All fields are required");
      return;
    }

    try {
      const transactionData = {
        amount,
        date: date.toISOString(),
        description,
      };
      let response;

      if (existingTransaction) {
        response = await axios.put(
          `/api/transactions/${existingTransaction._id}`,
          transactionData
        );
        onTransactionUpdated(response.data);
      } else {
        response = await axios.post("/api/transactions", transactionData);
        onTransactionAdded(response.data);
      }

      setAmount("");
      setDate(new Date());
      setDescription("");
      setError("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message || "Error saving transaction");
      } else {
        setError("Error saving transaction");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  flex flex-col min-w-max p-6 rounded-lg shadow-xl space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-lg">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent p-5 rounded border border-gray-200 hover:border-black text-xl transition-all duration-500 ease-in-out"
            placeholder="Enter Amount"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " justify-start rounded p-5 text-left font-normal border-slate-200 hover:border-black transition-all duration-500 ease-in-out",
                  !date && "text-muted-foreground w-full rounded p-5 "
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full items-center p-0 bg-white rounded">
              <Calendar
                className="w-full"
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg">Description</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent p-5 rounded border border-gray-200 hover:border-black transition-all duration-500 ease-in-out"
            placeholder="Enter discription"
            required
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <Button
          type="submit"
          className="w-full py-2 rounded p-6 bg-green-500 text-white  hover:bg-green-600  text-xl"
        >
          {existingTransaction ? "Update Transaction" : "Save Transaction"}
        </Button>
      </form>
    </>
  );
};

export default TransactionForm;
