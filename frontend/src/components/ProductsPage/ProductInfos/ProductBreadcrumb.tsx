import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/Shadcn/Breadcrumb";
import { type Product } from "@/components/ProductsPage/types";

function ProductBreadcrumb({product }: { product: Product }) {
    return (
        <div className="max-w-7xl mx-auto w-full px-8 pt-8 lg:px-8">
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="text-blue-700 hover:text-blue-700 hover:underline" href="/">Accueil</BreadcrumbLink>
                </BreadcrumbItem>
                {product?.category?.category_name && <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-blue-700 hover:text-blue-700 hover:underline" href={`/categories/${product.category.id}/products`}>Agriculture et alimentation</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-blue-700 hover:text-blue-700 hover:underline" href={`/categories/${product.category.id}/products`}>{product.category.category_name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    </>}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="pointer-default hover:cursor-default">{product?.product_name}</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default ProductBreadcrumb;