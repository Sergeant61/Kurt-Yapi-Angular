import { Hakedis } from './Hakedis';
import { User } from './User';
import { Santiye } from './Santiye';
import { Firma } from './Firma';

export class FirmaCari {
  _id: string;

  caridate: Date;
  seriNo: string;
  belgeTuru: string;
  aciklama: string;
  borc: string;
  alacak: string;
  borcBakiyesi: string;
  alacakBakiyesi: string;

  santiyeId: string;
  firmaId: string;
  hakedisId: string;
  saveUserId: string;

  createdAt: Date;

  /** */
  santiye: Santiye = new Santiye();
  firma: Firma = new Firma();
  saveUser: User = new User();
  hakedis: Hakedis = new Hakedis();

}

