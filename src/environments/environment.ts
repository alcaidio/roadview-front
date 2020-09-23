// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    imerview: 'http://localhost:3000/api/v1',
  },
  mapbox: {
    token:
      'pk.eyJ1IjoidGltb3RoeTM0IiwiYSI6ImNrZWNycHFkdDBsazcyem1pOW8yeDFydmcifQ.3MeiDeCkzuunsCpB9tzfBw',
  },
  firebase: {
    apiKey: 'AIzaSyCosykb-Btr2HrVu5bH2OWZmCSxqrbTyfI',
    authDomain: 'immergis-roadview.firebaseapp.com',
    databaseURL: 'https://immergis-roadview.firebaseio.com',
    projectId: 'immergis-roadview',
    storageBucket: 'immergis-roadview.appspot.com',
    messagingSenderId: '626137211024',
    appId: '1:626137211024:web:9865cbb39d422464273815',
    measurementId: 'G-VZK27G8KNB',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
