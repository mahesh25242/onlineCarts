import { Routes } from '@angular/router';

export const AdminRouts: Routes=[
    { path: '', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)},
    { path: 'sign-out', loadChildren:()=>import('./sign-out/sign-out.module').then(m=>m.SignOutModule)},
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'products/:page', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),      
      runGuardsAndResolvers: 'always',
    },
    { path: 'deliveries', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule) },
    { path: 'details', loadChildren:()=>import('./shop-details/shop-details.module').then(m=>m.ShopDetailsModule),    },
    { path: 'orders',  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),    },
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule),},
    { path: 'renew',   loadChildren: () => import('./renew-package/renew-package.module').then(m => m.RenewPackageModule),  },
  ];

