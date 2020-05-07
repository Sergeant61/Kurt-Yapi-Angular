export class TirKamyonRapor {
  _id: string;
  raporDate: string;
  tirKamyon: string;
  personel: string;
  seferBilgileri: SeferBilgileri[] = [];
  createdAt: Date;

  constructor(
    raporDate: string,
    tirKamyon: string,
    personel: string,
  ) {
    this.raporDate = raporDate;
    this.tirKamyon = tirKamyon;
    this.personel = personel;
  }
}

export class SeferBilgileri {
  calisilanFirma: string;
  yuklemeYeri: string;
  dokumYeri: string;
  malzeme: string;
  sefer: number;
  toplamTonaj: number = 0;

  constructor(
    calisilanFirma: string,
    yuklemeYeri: string,
    dokumYeri: string,
    malzeme: string,
    sefer: number,
    toplamTonaj: number,
  ) {
    this.calisilanFirma = calisilanFirma;
    this.yuklemeYeri = yuklemeYeri;
    this.dokumYeri = dokumYeri;
    this.malzeme = malzeme;
    this.sefer = sefer;
    this.toplamTonaj = toplamTonaj;
  }
}

