export interface Burger {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  category: 'classic' | 'premium' | 'vegan' | 'seasonal' | 'side' | 'drink';
  tags: string[];
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Burger {
  quantity: number;
  selectedExtras?: Extra[];
}
