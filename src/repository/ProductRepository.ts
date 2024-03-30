const baseEndpoint = 'https://fakestoreapi.com/products'

const ProductRepository = {
    categories: async () => {
        const response = await fetch(`${baseEndpoint}/categories`)

        return await response.json()
    },
    products: async (category: null | string) => {
        const endpoint = category ? `${baseEndpoint}/category/${category}` : baseEndpoint

        const response = await fetch(endpoint)

        return await response.json()
    }
}

export default ProductRepository