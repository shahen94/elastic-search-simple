interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export async function getProducts(): Promise<Product[]> {
  return [
    { id: 1, name: 'Milk', price: 100, description: 'Taza kat', category: 'Category 1' },
    { id: 2, name: 'Pen', price: 200, description: 'Grich', category: 'Category 2' },
    { id: 3, name: 'Pencil 3', price: 300, description: 'Matit', category: 'Category 3' },
    { id: 4, name: 'Table', price: 400, description: 'sexan', category: 'Category 4' },
    { id: 5, name: 'Chair', price: 500, description: 'ator', category: 'Category 5' },
    { id: 6, name: 'Product 6', price: 600, description: 'Description 6', category: 'Category 6' },
    { id: 7, name: 'Product 7', price: 700, description: 'Description 7', category: 'Category 7' },
    { id: 8, name: 'Product 8', price: 800, description: 'Description 8', category: 'Category 8' },
    { id: 9, name: 'Product 9', price: 900, description: 'Description 9', category: 'Category 9' },
    { id: 10, name: 'Product 10', price: 1000, description: 'Description 10', category: 'Category 10' },
  ] satisfies Product[];
}