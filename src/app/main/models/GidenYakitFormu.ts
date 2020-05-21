import { Firma } from './Firma';
import { Personel } from './Personel';
import { TirKamyon } from './TirKamyon';
import { IsMakinesi } from './IsMakinesi';
import { User } from './User';
import { Santiye } from './Santiye';

export class GidenYakitFormu {
  _id: string;
  fisNo: string;
  tirKamyonPlakaId: string;
  isMakinesiPlakaId: string;
  formTarihi: string;
  verilenYakitLitre: string;
  yakitiAlanPersonelId: string;
  yakitiVerenPersonelId: string;
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
  yakitiVerenPersonel: Personel = new Personel();
  tirKamyon: TirKamyon = new TirKamyon();
  isMakinesi: IsMakinesi = new IsMakinesi();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
  santiye: Santiye = new Santiye();
}
