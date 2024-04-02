import { Category } from './Category.d';

export interface Product {
    id: number;
    name: string;
    description: string;
    category?: Category
    image: string;
    price: number;
    created_at: string | null;
    updated_at: string | null;
}