export class TirKamyonRapor {
  _id: string;
  raporDate: string;
  tirKamyon: string;
  personel: string;
  yuklemeYeriList: YuklemeYeri[] = [];
  dokumYeriList: DokumYeri[] = [];
  imza: string;
  createdAt: Date;

  constructor(
    raporDate: string,
    tirKamyon: string,
    personel: string,
    firma: string,
    imza: string,
  ) {
    this.raporDate = raporDate;
    this.tirKamyon = tirKamyon;
    this.personel = personel;
    this.imza = imza;

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
