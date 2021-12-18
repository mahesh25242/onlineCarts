import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },            
  { path: 'contact-us', loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },         
  { path: 'bag', loadChildren: () => import('./pages/cart-details/cart-details.module').then(m => m.CartDetailsModule) }, 
  { path: 'search/:q', loadChildren: () => import('./pages/search-result/search-result.module').then(m => m.SearchResultModule)   },
  { path: 'order/:id', loadChildren: () => import('./pages/order-deatil/order-details.module').then(m => m.OrderDetailsModule)   }, 
  { path: 'admin', loadChildren: () => import('./modules/index').then(m => m.AdminModule) }, 
  { path: '404', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  {
    path: ':catUrl',
    children:[
      { path: '', loadChildren: () => import('./pages/cms-page/cms-page.module').then(m => m.CmsPageModule) },             
      // {
      //   path: 'varities',
      //   component: HomeComponent, 
      //   resolve: {
      //     product: HomeProductsResolver
      //   }  
      // },
      { path: ':productUrl', loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule) },                   
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
})
export class AppRoutingModule { }
