// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environment as env } from 'shared/environments/environment';

const shopName = document.querySelector("meta[name=shop-name]");
const shopKey = document.querySelector("meta[name=shop-key]");
const themeColor = document.querySelector("meta[name=theme-color]");

export const environment = { ...env, ...{
  siteName: shopName?.getAttribute("content"),
  shopKey: shopKey?.getAttribute("content"),
  themeColor: themeColor?.getAttribute("content"),
  demoShopKey: '3d9f5a8eec71764c7c2df5a56496c8a1320dd921',
  vapidKey:'BKpLN2XozGCAWv8sxX98M0xH9E7Hpqm-xp3OFgvUPWfVlv4KFmxR00u4uQd-Skt9pxinhOV9kbnvHqqdb4fFp5Y'
}};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
