import api from '../services/api';
import { IndexOptions } from './../types/IndexOptions.d';
import { Pagination } from './../types/Pagination.d';
import { Product } from './../types/Product.d';

const ProductRepository = {
    index: async (options: IndexOptions = {}): Promise<Pagination<Product>> => {
        return (await api.get('api/products', { params: options })).data
    },
    show: async (id: number): Promise<Product> => {
        return (await api.get(`api/products/${id}`)).data
    },
}

export default ProductRepository