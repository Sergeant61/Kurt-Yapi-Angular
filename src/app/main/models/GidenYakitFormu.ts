import { Firma } from './Firma';
import { Personel } from './Personel';
import { TirKamyon } from './TirKamyon';
import { IsMakinesi } from './IsMakinesi';
import { User } from './User';

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
  onaylimi: boolean;
  createdAt: Date;
  createdUserId: string;
  lastEditAt: Date;
  lastEditUserId: string;
  onaylayanUserId: string;

  /** */
  yakitiAlanPersonel: Personel = new Personel();
  yakitiVerenPersonel: Personel = new Personel();
  tirKamyonPlaka: TirKamyon = new TirKamyon();
  isMakinesiPlaka: IsMakinesi = new IsMakinesi();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
}
