// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  path: 'https://kurt-yapi-api.herokuapp.com',
  path2: 'http://localhost:3000',
  baseUrlOzelbinekarac: '/admin/ozelbinekarac',
  baseUrlIsmakinesi: '/admin/ismakinesi',
  baseUrlTirKamyon: '/admin/tirkamyon',
  baseUrlFirma: '/admin/firma',
  baseUrlPersonel: '/admin/personel',
  baseUrlDokumSahasi: '/admin/dokumsahasi',
  //--------
  baseUrlTirKamyonCalisma: '/muhasebe/tirkamyon',
  baseUrlIsMakinesiCalisma: '/muhasebe/ismakinesi',
  baseUrlYakitFormu: '/muhasebe/yakitformu',
  baseUrlGelenYakitFormu: '/muhasebe/gelenyakitformu',
  baseUrlGidenYakitFormu: '/muhasebe/gidenyakitformu'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
