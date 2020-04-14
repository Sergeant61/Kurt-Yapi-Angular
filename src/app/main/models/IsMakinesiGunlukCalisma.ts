import { Firma } from './Firma';
import { DokumSahasi } from './DokumSahasi';
import { Personel } from './Personel';
import { User } from './User';
import { TirKamyon } from './TirKamyon';
import { IsMakinesi } from './IsMakinesi';

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
  imzalimi: boolean;
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

}
