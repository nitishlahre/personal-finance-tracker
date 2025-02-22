# Personal Finance Visualizer

A simple web application built with Next.js, React, Shadcn/UI, Recharts, and MongoDB to track personal finances. This app allows users to manage transactions, view monthly expenses, and ensure that their finances are organized and easy to visualize.

## Features

- Add, edit, and delete transactions.
- Track transaction details such as amount, date, and description.
- View monthly expenses in a bar chart.
- Responsive design for mobile and desktop views.
- Basic form validation to ensure correct input.

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: For building user interfaces.
- **Shadcn/UI**: A UI library to create polished and accessible design components.
- **Recharts**: For creating the charts to visualize expenses.
- **MongoDB**: NoSQL database to store transaction data.
- **CSS (Tailwind or custom)**: For styling and ensuring a responsive design.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer
```

### 2. Install dependencies

Make sure you have Node.js installed. Then install the necessary dependencies using npm or yarn.

```bash
npm install
# OR
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file at the root of the project with the following content:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Replace `your_mongodb_connection_string` with the URI for your MongoDB database.

### 4. Start the development server

Run the following command to start the app:

```bash
npm run dev
# OR
yarn dev
```

This will start the app at `http://localhost:3000`.

### 5. Database Setup

If you don't have a MongoDB instance, sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a cluster. Replace the `MONGODB_URI` in the `.env.local` file with the connection string provided by MongoDB Atlas.

## File Structure

```
/public
  - static assets like images, icons, etc.
  
/pages
  - /api: API routes to handle backend logic for transaction CRUD operations.
  - /index.tsx: The main page where the transaction list and chart are displayed.
  
/components
  - TransactionForm.tsx: A form to add/edit transactions.
  - TransactionList.tsx: Displays the list of transactions.
  - MonthlyExpensesChart.tsx: A component that renders the bar chart.

/styles
  - Tailwind CSS or custom styles for layout and responsiveness.

/lib
  - MongoDB utility files for connecting to the database.
```

## Usage

### Add a Transaction

- Click on the "Add Transaction" button to open the form.
- Fill in the amount, date, and description.
- Submit the form to save the transaction to the database.

### Edit a Transaction

- Find the transaction in the list view and click the "Edit" button.
- Modify the transaction details.
- Submit the form to update the transaction.

### Delete a Transaction

- Click the "Delete" button next to the transaction in the list view.
- The transaction will be removed from the database.

### Monthly Expenses Chart

- View a bar chart of your monthly expenses, automatically updated based on your transactions.

## Form Validation

Basic form validation is implemented to ensure:
- Amount is a number and greater than zero.
- Date is selected.
- Description is not empty.

## Responsive Design

The app is fully responsive and will adapt to different screen sizes, including mobile devices.

## Error Handling

Appropriate error messages will be displayed if:
- A transaction fails to be added/updated.
- MongoDB connection issues.
- Form validation fails.

## Future Improvements

- User authentication (sign up/sign in).
- Category-based expense tracking.
- Export data (CSV, PDF, etc.).
- More advanced charting features (e.g., pie chart for categories).

## License

This project is licensed under the MIT License.

---

This README provides clear instructions for setting up the project, using it, and an outline of its functionality. It also includes basic future improvements to give users an idea of where the project might go.
