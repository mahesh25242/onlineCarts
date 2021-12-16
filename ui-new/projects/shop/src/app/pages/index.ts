import { ContactUsComponent } from './contact-us/contact-us.component';
import { MobileContactComponent } from './contact-us/mobile-contact/mobile-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HomeProductsResolver } from './home/home-products-resolver';
import PageBlockComponents from './components';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolver } from './product-details/product-details-resolver';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { OrderDeatilComponent } from './order-deatil/order-deatil.component';
import { OrderDeatilResolver } from './order-deatil/order-deatil-resolver';

const pageComponents = [
    HomeComponent,
    ContactUsComponent,
    MobileContactComponent,
    PageNotFoundComponent,
    ...PageBlockComponents,
    ProductDetailsComponent,
    CmsPageComponent,
    OrderDeatilComponent
];

export {
    HomeComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    HomeProductsResolver,
    ProductDetailsComponent,
    ProductDetailsResolver,
    CmsPageComponent,
    OrderDeatilComponent,
    OrderDeatilResolver
}

export default pageComponents;