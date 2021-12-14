import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent, HomeComponent, HomeProductsResolver, PageNotFoundComponent, ProductDetailsComponent, ProductDetailsResolver } from './pages';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
    resolve: {
      product: HomeProductsResolver
    }         
  },
  {
    path: ':catUrl/varities',
    component: HomeComponent, 
    resolve: {
      product: HomeProductsResolver
    }         
  },
  {
    path: ':catUrl/:productUrl',
    component: ProductDetailsComponent,
    resolve:{
      product: ProductDetailsResolver
    }
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  // {
  //   path: 'bag',
  //   component: CartDetailsComponent
  // },
  // {
  //   path: 'order/:id',
  //   component: OrderDeatilComponent,
  //   resolve:{
  //     order: OrderDeatilResolver
  //   }
  // },
  {
    path: 'admin',
    loadChildren: () => import('./modules/index').then(m => m.AdminModule)
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children:[
  //     {
  //       path: '',
  //       component: HomeComponent,
  //       resolve:{
  //         product: ProductResolver
  //       }
  //     },
  //     {
  //       path: 'search/:q',
  //       component: SearchResultComponent,
  //     },
  //     {
  //       path: ':catUrl/varities',
  //       component: HomeComponent,
  //       resolve:{
  //         product: ProductResolver
  //       }
  //     },
  //     {
  //       path: ':catUrl/:productUrl',
  //       component: ProductDetailsComponent,
  //       resolve:{
  //         product: ProductDetailsResolver
  //       }
  //     },
  //   ]
  // },


  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    HomeProductsResolver,
    ProductDetailsResolver
  ]
})
export class AppRoutingModule { }
