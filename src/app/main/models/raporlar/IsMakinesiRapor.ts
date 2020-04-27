
export class IsMakinesiRapor {
  _id: string;
  raporDate: string;
  isMakinesi: string;
  personel: string;
  firma: string;
  yapilinIsTanimi: string;
  calismaSaati: string;
  calismaSekli: string;
  imza: string;
  createdAt: Date;

  constructor(
    raporDate: string, isMakinesi: string,
    personel: string, firma: string,
    yapilinIsTanimi: string, calismaSaati: string,
    calismaSekli: string, imza: string) {
    this.raporDate = raporDate;
    this.isMakinesi = isMakinesi;
    this.personel = personel;
    this.firma = firma;
    this.yapilinIsTanimi = yapilinIsTanimi;
    this.calismaSaati = calismaSaati;
    this.calismaSekli = calismaSekli;
    this.imza = imza;

  }
}
