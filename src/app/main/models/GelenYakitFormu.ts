import { Firma } from './Firma';
import { Personel } from './Personel';
import { User } from './User';
import { Santiye } from './Santiye';

export class GelenYakitFormu {
  _id: string;
  irsaliyeNo: string;
  firmaUnvani: string;
  formTarihi: string;
  alinanYakitLitre: string;
  birimFiyati: string;
  yakitiAlanPersonelId: string;
  notlar: string;
  santiyeId: string;
  onaylimi: boolean;
  createdAt: Date;
  createdUserId: string;
  lastEditAt: Date;
  lastEditUserId: string;
  onaylayanUserId: string;

  /** */
  yakitiAlanPersonel: Personel = new Personel();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
  santiye: Santiye = new Santiye();

}
