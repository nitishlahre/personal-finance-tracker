import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/mongodb";
import Transaction from "../../../models/Transactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "POST") {
    try {
      const { amount, date, description } = req.body;
      const newTransaction = new Transaction({
        amount,
        date,
        description,
      });

      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error saving transaction", error: error.message });
      } else {
        res.status(500).json({ message: "Error saving transaction" });
      }
    }
  } else if (req.method === "GET") {
    try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Error fetching transactions",
            error: error.message,
          });
      } else {
        res.status(500).json({ message: "Error fetching transactions" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
