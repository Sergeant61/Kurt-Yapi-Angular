import { IsMakinesi } from '../IsMakinesi';
import { SahaOlcumFormu } from '../SahaOlcumFormu';
import { FormTuru } from '../FormTuru';

export class PauntajAllRapor {
  _id: string;
  formTuru: FormTuru;
  pauntajRaporList: PauntajRapor[] = [];
  constructor(formTuru?: FormTuru) {
    this.formTuru = formTuru;
  }
}

export class PauntajRapor {
  _id: string;
  formTarihi: string;
  sahaOlcumList: SahaOlcumFormu[] = [];
  isMakinesiList: AracRapor[] = [];

  constructor(formTarihi: string) {
    this.formTarihi = formTarihi;
  }
}

export class AracRapor {
  _id: string;
  isMakinesi: IsMakinesi;
  calismaSaati: string;
  calismaSekli: string;

  constructor(
    isMakinesi: IsMakinesi,
    calismaSaati: string,
    calismaSekli: string
  ) {
    this.isMakinesi = isMakinesi;
    this.calismaSaati = calismaSaati;
    this.calismaSekli = calismaSekli;
  }

}


