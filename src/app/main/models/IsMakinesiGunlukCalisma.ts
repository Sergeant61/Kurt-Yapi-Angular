import { Firma } from './Firma';
import { Personel } from './Personel';
import { User } from './User';
import { IsMakinesi } from './IsMakinesi';
import { FormTuru } from './FormTuru';
import { Santiye } from './Santiye';

export class IsMakinesiGunlukCalisma {
  _id: string;
  siraNo: string;
  plakaId: string;
  formTarihi: string;
  firmaId: string;
  yapilinIsTanimi: string;
  calismaSaati: string;
  calismaSekli: string;
  motorSaati: string;
  alinanMotorin: string;
  personelId: string;
  firmaYetkilisiAdSoyad: string;
  notlar: string;
  formTuruId: string;
  santiyeId: string;
  onaylimi: boolean;
  createdAt: Date;
  createdUserId: string;
  lastEditAt: Date;
  lastEditUserId: string;
  onaylayanUserId: string;

  /** */
  firma: Firma = new Firma();
  personel: Personel = new Personel();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
  isMakinesi: IsMakinesi = new IsMakinesi();
  formTuru: FormTuru = new FormTuru();
  santiye: Santiye = new Santiye();

}
