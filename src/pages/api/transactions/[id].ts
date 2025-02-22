import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/mongodb";
import Transaction from "../../../models/Transactions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await connectToDatabase();

  if (req.method === "PUT") {
    try {
      const { amount, date, description } = req.body;
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { amount, date, description },
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(200).json(updatedTransaction);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Error updating transaction",
            error: error.message,
          });
      } else {
        res.status(500).json({ message: "Error updating transaction" });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedTransaction = await Transaction.findByIdAndDelete(id);

      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.status(204).json({ message: "Transaction deleted" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Error deleting transaction",
            error: error.message,
          });
      } else {
        res.status(500).json({ message: "Error deleting transaction" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
