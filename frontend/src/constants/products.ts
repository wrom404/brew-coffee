import coffee1 from '../assets/coffee/pic1.jpg'
import coffee2 from '../assets/coffee/pic2.jpg'
import coffee3 from '../assets/coffee/pic3.jpg'
import coffee4 from '../assets/coffee/pic4.jpg'
import coffee5 from '../assets/coffee/pic5.jpg'
import coffee6 from '../assets/coffee/pic6.jpg'
import coffee7 from '../assets/coffee/pic7.jpg'
import coffee8 from '../assets/coffee/pic8.jpg'
import coffee10 from '../assets/coffee/pic10.jpg'
import coffee12 from '../assets/coffee/pic12.jpg'
import coffee13 from '../assets/coffee/pic13.jpg'
import coffee16 from '../assets/coffee/pic16.jpg'
import coffee19 from '../assets/coffee/pic19.jpg'
import coffee20 from '../assets/coffee/pic20.jpg'
import { Coffee } from '@/types/types'

// featured photo
import featuredPhoto1 from "@/assets/featured/pic12.jpg"
import featuredPhoto2 from "@/assets/featured/pic19.jpg"
import featuredPhoto4 from "@/assets/featured/pic20.jpg"

// 

export const categories = ['All', 'American', 'Milk-Based', 'Espresso', 'Black Coffee'];

export const coffeeProducts: Coffee[] = [
  {
    id: "1",
    title: "Macchiato",
    category: "Espresso",
    description:
      "Espresso marked with a small amount of foamed milk. A bold shot with a smooth touch.",
    price: 35.00,
    imageUrl: coffee13,
    badge: "BEST SELLER",
  },
  {
    id: "2",
    title: 'Latte',
    category: 'Milk-Based',
    description: 'Espresso topped with silky steamed milk and a touch of foam. Smooth and comforting.',
    price: 30.00,
    imageUrl: featuredPhoto1,
  },
  {
    id: "3",
    title: 'Affogato',
    category: 'Dessert',
    description: 'A scoop of vanilla ice cream "drowned" in a shot of hot espresso. A dessert and a drink in one.',
    price: 50.00,
    imageUrl: featuredPhoto2,
    badge: "NEW",
  },
  {
    id: "4",
    title: 'Cold Brew',
    category: 'Iced Coffee',
    description: 'Slow-brewed for 12+ hours, resulting in a smooth, low-acid coffee served over ice.',
    price: 45.00,
    imageUrl: featuredPhoto4,
  },
];

interface CoffeeProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const coffeeProductsMenu: CoffeeProduct[] = [
  {
    id: '1',
    name: 'Espresso Shot',
    category: 'Espresso',
    description: 'A rich, concentrated shot of pure coffee with bold flavor and crema. The base of all espresso drinks.',
    price: 3.50,
    imageUrl: coffee1
  },
  {
    id: '2',
    name: 'Americano',
    category: 'Black Coffee',
    description: 'Espresso diluted with hot water for a smooth and bold black coffee experience.',
    price: 4.00,
    imageUrl: coffee2
  },
  {
    id: '3',
    name: 'Cappuccino',
    category: 'Milk-Based',
    description: 'Equal parts espresso, steamed milk, and foam for a creamy, balanced cup.',
    price: 4.50,
    imageUrl: coffee3
  },
  {
    id: '4',
    name: 'Latte',
    category: 'Milk-Based',
    description: 'Espresso topped with silky steamed milk and a touch of foam. Smooth and comforting.',
    price: 4.75,
    imageUrl: coffee4
  },
  {
    id: '5',
    name: 'Mocha',
    category: 'Chocolate-Based',
    description: 'A decadent mix of espresso, steamed milk, and chocolate syrup, finished with whipped cream.',
    price: 5.00,
    imageUrl: coffee5
  },
  {
    id: '6',
    name: 'Macchiato',
    category: 'Espresso',
    description: 'Espresso marked with a small amount of foamed milk. A bold shot with a smooth touch.',
    price: 4.25,
    imageUrl: coffee6
  },
  {
    id: '7',
    name: 'Flat White',
    category: 'Milk-Based',
    description: 'Velvety smooth espresso with microfoam milk, popular in Australia and New Zealand.',
    price: 4.75,
    imageUrl: coffee7
  },
  {
    id: '8',
    name: 'Affogato',
    category: 'Dessert',
    description: 'A scoop of vanilla ice cream "drowned" in a shot of hot espresso. A dessert and a drink in one.',
    price: 5.25,
    imageUrl: coffee8
  },
  {
    id: '9',
    name: 'Cold Brew',
    category: 'Iced Coffee',
    description: 'Slow-brewed for 12+ hours, resulting in a smooth, low-acid coffee served over ice.',
    price: 4.95,
    imageUrl: coffee10
  },
  {
    id: '10',
    name: 'Iced Latte',
    category: 'Iced Coffee',
    description: 'Chilled espresso with cold milk served over ice. A refreshing twist on a classic latte.',
    price: 4.95,
    imageUrl: coffee12
  },
  {
    id: '11',
    name: 'Café au Lait',
    category: 'Milk-Based',
    description: 'Brewed coffee mixed with steamed milk for a mellow, creamy cup.',
    price: 4.25,
    imageUrl: coffee13
  },
  {
    id: '12',
    name: 'Ristretto',
    category: 'Espresso',
    description: 'A short shot of espresso made with less water, resulting in a more concentrated flavor.',
    price: 3.75,
    imageUrl: coffee16
  },
  {
    id: '13',
    name: 'Irish Coffee',
    category: 'Alcoholic',
    description: 'Hot black coffee blended with Irish whiskey, sugar, and topped with cream.',
    price: 6.50,
    imageUrl: coffee19
  },
  {
    id: '14',
    name: 'Café Bombón',
    category: 'Sweet',
    description: 'A Spanish favorite made with equal parts espresso and sweetened condensed milk.',
    price: 4.50,
    imageUrl: coffee20
  },
  {
    id: '15',
    name: 'Breve',
    category: 'Milk-Based',
    description: 'Espresso mixed with steamed half-and-half for a rich and indulgent taste.',
    price: 5.25,
    imageUrl: coffee5
  }
];
