export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  price: number;
  calories: number;
  prepTime: number;
  rating: number;
  isVegetarian: boolean;
}

export const meals: Meal[] = [
  {
    id: '1',
    name: 'Spicy Chicken Tikka',
    description: 'Tender chicken marinated in aromatic spices and grilled to perfection',
    image: '/placeholder-food-1.jpg',
    cuisine: 'Indian',
    price: 18,
    calories: 320,
    prepTime: 25,
    rating: 4.8,
    isVegetarian: false
  },
  {
    id: '2',
    name: 'Mediterranean Quinoa Bowl',
    description: 'Fresh quinoa with roasted vegetables, feta cheese, and tahini dressing',
    image: '/placeholder-food-2.jpg',
    cuisine: 'Mediterranean',
    price: 14,
    calories: 280,
    prepTime: 15,
    rating: 4.6,
    isVegetarian: true
  },
  {
    id: '3',
    name: 'Kung Pao Chicken',
    description: 'Classic Sichuan dish with chicken, peanuts, and dried chilies',
    image: '/placeholder-food-3.jpg',
    cuisine: 'Chinese',
    price: 16,
    calories: 350,
    prepTime: 20,
    rating: 4.7,
    isVegetarian: false
  },
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce',
    image: '/placeholder-food-4.jpg',
    cuisine: 'Italian',
    price: 22,
    calories: 450,
    prepTime: 30,
    rating: 4.9,
    isVegetarian: true
  },
  {
    id: '5',
    name: 'Fish Tacos',
    description: 'Grilled fish with cabbage slaw, avocado, and chipotle cream',
    image: '/placeholder-food-5.jpg',
    cuisine: 'Mexican',
    price: 15,
    calories: 310,
    prepTime: 18,
    rating: 4.5,
    isVegetarian: false
  },
  {
    id: '6',
    name: 'Palak Paneer',
    description: 'Creamy spinach curry with soft paneer cubes and aromatic spices',
    image: '/placeholder-food-6.jpg',
    cuisine: 'Indian',
    price: 13,
    calories: 250,
    prepTime: 22,
    rating: 4.4,
    isVegetarian: true
  },
  {
    id: '7',
    name: 'Beef Ramen',
    description: 'Rich tonkotsu broth with tender beef, soft-boiled egg, and scallions',
    image: '/placeholder-food-7.jpg',
    cuisine: 'Chinese',
    price: 19,
    calories: 420,
    prepTime: 35,
    rating: 4.8,
    isVegetarian: false
  },
  {
    id: '8',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
    image: '/placeholder-food-8.jpg',
    cuisine: 'Italian',
    price: 12,
    calories: 180,
    prepTime: 10,
    rating: 4.3,
    isVegetarian: true
  },
  {
    id: '9',
    name: 'Greek Chicken Souvlaki',
    description: 'Marinated chicken skewers with tzatziki sauce and pita bread',
    image: '/placeholder-food-9.jpg',
    cuisine: 'Mediterranean',
    price: 17,
    calories: 340,
    prepTime: 28,
    rating: 4.6,
    isVegetarian: false
  }
];