export type Product = {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
    brand: string;
    category: string;
    shippingInformation: string;
  
    //các trường chưa động đến
    discountPercentage: number;
    stock: number;
    tag: [];
    skud: string;
    weight: number;
    dimensions: [];
    warrantyInformation: string;
    reviews: [];
    availabilityStatus: string;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: string;
    images: [];
  };