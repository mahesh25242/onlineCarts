import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent, CmsPageComponent, ContactUsComponent, HomeComponent, HomeProductsResolver, OrderDeatilComponent, OrderDeatilResolver, PageNotFoundComponent, ProductDetailsComponent, ProductDetailsResolver, SearchResultComponent } from './pages';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
    resolve: {
      product: HomeProductsResolver
    }         
  },  
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'bag',
    component: CartDetailsComponent
  },
  {
    path: 'order/:id',
    component: OrderDeatilComponent,
    resolve:{
      order: OrderDeatilResolver
    }
  },
  {
    path: 'search/:q',
    component: SearchResultComponent,
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/index').then(m => m.AdminModule)
  },
  { path: '404', component: PageNotFoundComponent },
  {
    path: ':catUrl',
    children:[
      { path: '', component: CmsPageComponent },
      {
        path: 'varities',
        component: HomeComponent, 
        resolve: {
          product: HomeProductsResolver
        }  
      },
      {
        path: ':productUrl',
        component: ProductDetailsComponent,
        resolve:{
          product: ProductDetailsResolver
        }
      },      
    ]
    
           
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
