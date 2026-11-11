export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
};

export type TodoFilter = 'all' | 'active' | 'done';

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'>;
export type CartItem = CartProduct & { quantity: number };

export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type NoteInput = Pick<Note, 'title' | 'content'>;
export type NoteUpdate = Partial<NoteInput>;
