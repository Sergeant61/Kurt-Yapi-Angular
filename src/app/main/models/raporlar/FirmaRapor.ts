import { IsMakinesi } from '../IsMakinesi';

export class FirmaRapor {
  _id: string;
  formTarihi: string;
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


