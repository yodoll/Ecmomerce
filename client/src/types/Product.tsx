export type Product = {
    _id: string | undefined;
    title: string;
    price: number;
    description: string;
    image: string;
    category: Category;
  };

  export type Category = {
    _id: string;
    name: string;
  };