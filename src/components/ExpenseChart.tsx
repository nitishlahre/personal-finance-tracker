import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Transaction } from "../types/Transaction";

interface ExpenseChartProps {
  transactions: Transaction[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const monthlyExpenses: { [key: string]: number } = transactions.reduce(
    (acc, { date, amount }) => {
      const month = new Date(date).toLocaleString("default", {
        month: "short",
      });
      if (!acc[month]) acc[month] = 0;
      acc[month] += amount;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const data = Object.keys(monthlyExpenses).map((month) => ({
    name: month,
    expense: monthlyExpenses[month],
  }));

  return (
    <BarChart width={500} height={300} data={data} className="flex flex-col">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="expense" fill="#8884d8" />
    </BarChart>
  );
};

export default ExpenseChart;
