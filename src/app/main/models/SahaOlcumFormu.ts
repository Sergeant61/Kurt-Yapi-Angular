import { User } from './User';
import { IsBirimi } from './IsBirimi';
import { Firma } from './Firma';
import { Santiye } from './Santiye';

export class SahaOlcumFormu {
  _id: string;
  siraNo: string;
  firmaId: string;
  formTarihi: string;
  isBirimiId: string;

  yekitiFirma: string;
  yekitiAdiSoyadi: string;
  m3: number;
  notlar: string;
  santiyeId: string;
  onaylimi: boolean;
  createdAt: Date;
  createdUserId: string;
  lastEditAt: Date;
  lastEditUserId: string;
  onaylayanUserId: string;

  /** */
  firma: Firma = new Firma();
  isBirimi: IsBirimi = new IsBirimi();
  createdUser: User = new User();
  lastEditUser: User = new User();
  onaylayanUser: User = new User();
  santiye: Santiye = new Santiye();

}
