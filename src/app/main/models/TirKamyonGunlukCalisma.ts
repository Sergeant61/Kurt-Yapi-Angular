import { Firma } from './Firma';
import { DokumSahasi } from './DokumSahasi';
import { Personel } from './Personel';
import { User } from './User';
import { TirKamyon } from './TirKamyon';
import { FormTuru } from './FormTuru';
import { Santiye } from './Santiye';

export class TirKamyonGunlukCalisma {
  _id: string;
  siraNo: string;
  plakaId: string;
  formTarihi: string;
  firmaId: string;
  yuklemeYeri: string;
  dokumSahasiId: string;
  malzemeCinsi: string;
  seferSayisi: string;
  tonajList: string[] = [];
  alinanMotorin: string;
  kilometre: string;
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
  dokumsahasi: DokumSahasi = new DokumSahasi();
  personel: Personel = new Personel();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
  tirKamyon: TirKamyon = new TirKamyon();
  formTuru: FormTuru = new FormTuru();
  santiye: Santiye = new Santiye();

}
