import { ProductsComponent } from './products.component';
import { ProductsResolver } from './products-resolver';
import { CreateProductResolver } from './create-product/create-product-resolver';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductsComponent } from './list-product/list-products.component';
import { SearchProductComponent } from './search-product/search-product.component';

const ProductsComponents = [
    ProductsComponent,
    CreateProductComponent,
    ListProductsComponent,
    SearchProductComponent
];

export {
    ProductsResolver,
    CreateProductResolver,
    ProductsComponent,
    ListProductsComponent,
    CreateProductComponent
}

export default ProductsComponents;