// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { environment as env  } from 'src/environments/environment';
export const environment = {
  production: false,
  siteName: document.querySelector("meta[name=shop-name]").getAttribute("content"),
  shopKey: document.querySelector("meta[name=shop-key]").getAttribute("content"),
  demoShopKey: '3d9f5a8eec71764c7c2df5a56496c8a1320dd921',
  baseUrl: env.baseUrl,
  siteAddress: env.siteAddress,
  gMapUrl: env.gMapUrl,
  openstreetmap: env.openstreetmap,
  productListPerPage: 200,
  firebaseConfig : env.firebaseConfig,
  socketConfig: env.socketConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
