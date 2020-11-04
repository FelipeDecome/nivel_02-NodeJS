import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const incomeTotalValue = incomeTransactions.reduce(
      (result, transaction) => result + transaction.value,
      0,
    );

    const outomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const outcomeTotalValue = outomeTransactions.reduce(
      (result, transaction) => result + transaction.value,
      0,
    );

    const total = incomeTotalValue - outcomeTotalValue;

    return {
      income: incomeTotalValue,
      outcome: outcomeTotalValue,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
