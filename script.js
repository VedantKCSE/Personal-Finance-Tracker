// Retrieve transactions from local storage or initialize an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Display transactions on page load
displayTransactions();

// Calculate and display the current balance, incomes, and expenses
calculateBalance();
displayIncomes();
displayExpenses();

// Add transaction event listener
document.getElementById('transactionForm').addEventListener('submit', addTransaction);

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  // Get user inputs
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  
  // Get current date and time
  const timestamp = new Date();

  // Create a new transaction object
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
    timestamp
  };

  // Add the transaction to the array
  transactions.push(transaction);

  // Update local storage
  updateLocalStorage();

  // Clear form inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

  // Display the updated transactions, incomes, and expenses
  displayTransactions();
  displayIncomes();
  displayExpenses();

  // Recalculate and display the current balance
  calculateBalance();
}

// Display transactions
function displayTransactions() {
  const transactionList = document.getElementById('transactionList');

  // Clear the transaction list
  transactionList.innerHTML = '';

  // Reverse the transactions array to display the most recent transaction first
  const reversedTransactions = transactions.slice().reverse();

  // Iterate through reversed transactions and create list items
  reversedTransactions.forEach(transaction => {
    const listItem = document.createElement('li');
    const dateTime = new Date(transaction.timestamp).toLocaleString();
    listItem.innerHTML = `
      <span class="ty">${transaction.description}</span>
      <span class="${transaction.type}">₹${transaction.amount.toFixed(2)}</span>
      <span class="timestamp">${dateTime}</span>
      <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionList.appendChild(listItem);
  });
}

// Display incomes
function displayIncomes() {
  const incomeList = document.getElementById('incomeList');

  // Clear the income list
  incomeList.innerHTML = '';

  // Filter transactions by income type
  const incomes = transactions.filter(transaction => transaction.type === 'income');

  // Iterate through incomes and create list items
  incomes.forEach(income => {
    const listItem = document.createElement('div');
    listItem.textContent = `${income.description}: ₹${income.amount.toFixed(2)}`;
    incomeList.appendChild(listItem);
  });
}

// Display expenses
function displayExpenses() {
  const expenseList = document.getElementById('expenseList');

  // Clear the expense list
  expenseList.innerHTML = '';

  // Filter transactions by expense type
  const expenses = transactions.filter(transaction => transaction.type === 'expense');

  // Iterate through expenses and create list items
  expenses.forEach(expense => {
    const listItem = document.createElement('div');
    listItem.textContent = `${expense.description}: ₹${expense.amount.toFixed(2)}`;
    expenseList.appendChild(listItem);
  });
}

// Delete transaction
function deleteTransaction(id) {
  // Remove the transaction from the array
  transactions = transactions.filter(transaction => transaction.id !== id);

  // Update local storage
  updateLocalStorage();

  // Display the updated transactions, incomes, and expenses
  displayTransactions();
  displayIncomes();
  displayExpenses();

  // Recalculate and display the current balance
  calculateBalance();
}

// Calculate and display the current balance
function calculateBalance() {
  const balance = document.getElementById('balance');
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const currentBalance = income - expense;
  balance.textContent = `Current Balance: ₹${currentBalance.toFixed(2)}`;
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
