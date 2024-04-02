import api from '../services/api.ts';
import { Pagination } from './../types/Pagination.d';
import { Product } from './../types/Product.d';

interface Options {
    limit?: number,
    with?: string,
    randomOrder?: boolean,
}

const ProductRepository = {
    index: async (options: Options = {}): Promise<Pagination<Product>> => {
        return (await api.get('api/products', { params: options })).data
    },
    show: async (id: number): Promise<Product> => {
        return (await api.get(`api/products/${id}`)).data
    },
}

export default ProductRepository