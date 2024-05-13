import { ReactNode, createContext, useMemo, useState } from "react";
import ProductQuickView from "../components/product/product-quick-view";
import { Product } from "../types/Product";

const INITIAL_VALUE = {
    product: null as null | Product,
    setProduct: function () { } as Function,
}

export const ProductQuickViewContext = createContext(INITIAL_VALUE)

interface ProductQuickViewProviderProps {
    children: ReactNode
}

export function ProductQuickViewProvider({ children }: ProductQuickViewProviderProps) {
    const [product, setProduct] = useState<null | Product>(null)
    const [open, setOpen] = useState(false)

    const context = useMemo(() => {
        return { product, setProduct: handleSetProduct }
    }, [product])

    function handleSetProduct(value: Product | null) {
        setProduct(value)
        setOpen(!!value)
    }

    return (
        <ProductQuickViewContext.Provider value={context}>
            <ProductQuickView product={product} handle={{ open, setOpen }} />
            {children}
        </ProductQuickViewContext.Provider>
    )
}
