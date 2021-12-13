import { ProductsComponent } from './products.component';
import { ProductsResolver } from './products-resolver';
import { CreateProductResolver } from './create-product/create-product-resolver';
import { CreateProductStep1Component } from './create-product/create-product-setp-1/create-product-setp-1.component';
import { CreateProductStep2Component } from './create-product/create-product-setp-2/create-product-setp-2.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductsComponent } from './list-product/list-products.component';
import { SearchProductComponent } from './search-product/search-product.component';

const ProductsComponents = [
    ProductsComponent,
    CreateProductComponent,
    ListProductsComponent,
    SearchProductComponent,
    CreateProductStep1Component,
    CreateProductStep2Component
];

export {
    ProductsResolver,
    CreateProductResolver,
    ProductsComponent,
    ListProductsComponent,
    CreateProductComponent
}

export default ProductsComponents;