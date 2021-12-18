import { Routes } from '@angular/router';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';



export const AdminRouts: Routes=[
    { path: '', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule), canActivate: [NegateAuthGuard]},
    { path: 'sign-out', loadChildren:()=>import('./sign-out/sign-out.module').then(m=>m.SignOutModule), canActivate: [AdminAuthGuard] },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AdminAuthGuard] },
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule), canActivate: [AdminAuthGuard]  },
    { path: 'products/:page', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      canActivate: [AdminAuthGuard],      
      runGuardsAndResolvers: 'always',
    },

    {
      path: 'deliveries',
      loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule),
      canActivate: [AdminAuthGuard],      
    },
    { path: 'details', loadChildren:()=>import('./shop-details/shop-details.module').then(m=>m.ShopDetailsModule), canActivate: [AdminAuthGuard]   },
    { path: 'orders',  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AdminAuthGuard],   },
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule),canActivate: [AdminAuthGuard] },
    { path: 'renew',   loadChildren: () => import('./renew-package/renew-package.module').then(m => m.RenewPackageModule), canActivate: [AdminAuthGuard] },
  ];

