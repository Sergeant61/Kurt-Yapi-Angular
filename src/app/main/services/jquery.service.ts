import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class JqueryService {

  constructor() { }

  jquery() {
    return $;
  }
}
