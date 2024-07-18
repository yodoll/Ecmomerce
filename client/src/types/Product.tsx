export type Product = {
    _id: string;
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

  export type ProductFormParams = {
    _id?: string;
    title: string;
    price: number;
    image: string;
    description: string;
    category: Category;
    isShow: boolean;
  };