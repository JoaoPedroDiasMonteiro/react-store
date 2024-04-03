import api from "../services/api.ts";
import { Category } from '../types/Category';
import { Pagination } from '../types/Pagination';
import { IndexOptions } from './../types/IndexOptions.d';

const CategoryRepository = {
    index: async(options: IndexOptions = {}): Promise<Pagination<Category>> => {
        return (await api.get('api/categories', {params: options})).data
    }
}

export default CategoryRepository
