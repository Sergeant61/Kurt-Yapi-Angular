export class TirKamyonRapor {
  _id: string;
  raporDate: string;
  tirKamyon: string;
  personel: string;
  yuklemeYeriList: YuklemeYeri[] = [];
  dokumYeriList: DokumYeri[] = [];
  toplamTonaj: number = 0;
  createdAt: Date;

  constructor(
    raporDate: string,
    tirKamyon: string,
    personel: string,
    toplamTonaj: number,
  ) {
    this.raporDate = raporDate;
    this.tirKamyon = tirKamyon;
    this.personel = personel;
    this.toplamTonaj = toplamTonaj;

  }
}

export class YuklemeYeri {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class DokumYeri {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
