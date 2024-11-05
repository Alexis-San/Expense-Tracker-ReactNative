export type Category = {
  id: string;
  name: string;
  image?: number;
  src?: string;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  date: string;
  cardId: string;
  type: string;
};

export type Card = {
  id: string;
  name: string;
  balance: number;
};
