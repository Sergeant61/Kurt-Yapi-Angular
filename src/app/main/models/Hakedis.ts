import { Firma } from './Firma';
import { User } from './User';
import { Santiye } from './Santiye';

export class Hakedis {
  _id: string;

  firmaId: string;
  santiyeId: string;
  toplamFiyat: string;
  birimFiyatList: BirimFiyat[] = [];
  onaylimi: boolean;

  firtDate: Date;
  lastDate: Date;

  createdAt: Date;
  lastEditAt: Date;

  saveUserId: string;
  confirmUserId: string;

  /** */
  firma: Firma = new Firma();
  santiye: Santiye = new Santiye();
  saveUser: User = new User();
  confirmUser: User = new User();

}

export class BirimFiyat {
  name: string;
  birim: string;
  birimFiyat: string;
  toplamfiyat: string;
  constructor(name: string, birim: string, birimFiyat: string, toplamfiyat: string) {
    name = name;
    birim = birim;
    birimFiyat = birimFiyat;
    toplamfiyat = toplamfiyat;
  }
}
