// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tinyMceApi: 'n6mryrdzt1pclqabsvpbvw6mtym3kj9gpwjguof89d2sv52q',
  baseUrl: 'http://localhost/onlineCart/api/public/v1',
  //baseUrl: 'https://agoranature.com/api/public/v1', //test
  recaptchaKey: '6Lca6c0aAAAAAAEXWHxR2Sl7t0OO8L6AdbPkCJq8',
  lumenSecret: 'K6IlhS1oZBgxNQciIEtCoXzlHRGu0MefIkNkp68b',
  client_id: 2 ,
  grant_type: "password",
  siteAddress: 'http://localhost/onlineCart/api/public',
  //siteAddress: 'https://agoranature.com/api/public', //test
  gMapUrl: `http://maps.google.com`,
  openstreetmap: `https://nominatim.openstreetmap.org`,
  firebaseConfig : {
    apiKey: "AIzaSyAqQlyuKOLiaCchhXmKUi7YJo7qQPwKaXY",
    authDomain: "onlinecart-39321.firebaseapp.com",
    projectId: "onlinecart-39321",
    storageBucket: "onlinecart-39321.appspot.com",
    messagingSenderId: "1091431823095",
    appId: "1:1091431823095:web:92e711268a18ddaa7985f2",
    measurementId: "G-NL8WQFLDE2"
   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
