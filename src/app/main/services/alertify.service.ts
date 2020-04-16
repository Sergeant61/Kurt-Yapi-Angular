import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(messaage: string) {
    alertify.success(messaage);
  }

  error(messaage: string) {
    alertify.error(messaage);
  }

  warning(messaage: string) {
    alertify.warning(messaage);
  }

  message(messaage: string) {
    alertify.message(messaage);
  }

  alert(messaage: string) {
    alertify.alert(messaage);
  }
}
