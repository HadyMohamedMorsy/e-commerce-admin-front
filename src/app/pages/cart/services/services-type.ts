export interface Cart {
  id: number;
  user: any;
  total: number;
  cartItem: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: number;
  cart: Cart;
  product: number;
  quantity: number;
}
