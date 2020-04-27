import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import { IsMakinesiGunlukCalismaFormuService } from 'src/app/main/rest.module/is-makinesi-gunluk-calisma-formu.service';
import { GunlukRapor } from 'src/app/main/models/raporlar/GunlukRapor';
import { IsMakinesiRapor } from 'src/app/main/models/raporlar/IsMakinesiRapor';
import { TirKamyonRapor, YuklemeYeri, DokumYeri } from 'src/app/main/models/raporlar/TirKamyonRapor';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-gunluk-rapor',
  templateUrl: './gunluk-rapor.component.html',
  styleUrls: ['./gunluk-rapor.component.css']
})
export class GunlukRaporComponent implements OnInit {

  gunlukRapor: GunlukRapor = new GunlukRapor();
  baseUrl: string = environment.baseUrlGunlukRapor;
  tirKamyonThead: string[] = ['Plaka', 'Personel', 'İmza'];
  multiAray: [][] = [];
  todayDate: string = new Date().toISOString().slice(0, 10);

  tablo: Array<string[]> = [];

  constructor(
    public authService: AuthService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) { }

  ngOnInit(): void {
    this.dateChange();
  }

  dateChange() {
    this.getValues().then(rapor => {

      console.log(rapor);

      // Yük listesi düzenleme
      rapor.tirKamyonRapor.forEach(data => {

        data.yuklemeYeriList.forEach(yuk => {

          const i = this.tirKamyonThead.findIndex(t => {
            return t === yuk.name;
          });

          if (i === -1) {
            this.tirKamyonThead.push(yuk.name);

          }
        });


      });
      this.tirKamyonThead.push('Yük. Toplam');

      // Döküm listesi düzenleme
      rapor.tirKamyonRapor.forEach(data => {

        data.dokumYeriList.forEach(dok => {

          const i = this.tirKamyonThead.findIndex(t => {
            return t === dok.name;
          });

          if (i === -1) {
            this.tirKamyonThead.push(dok.name);
          }
        });


      });

      this.tirKamyonThead.push('Dok. Toplam');

      // tablo Create
      rapor.tirKamyonRapor.forEach(data => {
        const satir: string[] = [];

        satir.push(data.tirKamyon);
        satir.push(data.personel);
        satir.push(data.imza);


        let yukT = 0;
        data.yuklemeYeriList.forEach(yuk => {

          const i = this.tirKamyonThead.findIndex(t => {
            return t === yuk.name;
          });
          satir[i] = yuk.value + '';
          yukT = yukT + yuk.value;
        });

        const k = this.tirKamyonThead.findIndex(t => {
          return t === 'Yük. Toplam';
        });
        satir[k] = yukT + '';


        let dokT = 0;
        data.dokumYeriList.forEach(dok => {

          const i = this.tirKamyonThead.findIndex(t => {
            return t === dok.name;
          });
          satir[i] = dok.value + '';
          dokT = dokT + dok.value;
        });

        const l = this.tirKamyonThead.findIndex(t => {
          return t === 'Dok. Toplam';
        });
        satir[l] = dokT + '';

        this.tablo.push(satir);
      });

      const satirr: string[] = [];

      this.tablo.forEach(satirList => {

        for (let index = 3; index < this.tirKamyonThead.length; index++) {
          const s = satirList[index];
          satirr[index] = '' + (+(satirr[index] === undefined ? 0 : satirr[index]) + +(s === undefined ? 0 : s));
        }

      });
      this.tablo.push(satirr);

    });
  }

  async getValues() {
    this.gunlukRapor = new GunlukRapor();

    await this.getIsmakinesi();
    await this.getTirKamyon();

    return this.gunlukRapor;
  }

  getIsmakinesi() {
    return this.isMakinesiGunlukCalismaFormuService.getRaporDetail({ mode: 1, todayDate: this.todayDate })
      .toPromise().then(data => {
        if (data.success) {
          data.data.forEach(form => {
            this.gunlukRapor.isMakinesiRapor
              .push(new IsMakinesiRapor(
                this.todayDate,
                form.isMakinesi.makineCinsi,
                form.personel.name + ' ' + form.personel.surname,
                form.firma.name,
                form.yapilinIsTanimi,
                form.calismaSaati,
                form.calismaSekli,
                form.imzalimi ? 'İmzalı' : 'İmzasız'
              ));

          });
        }
      }).catch(err => { });

  }

  getTirKamyon() {
    return this.tirKamyonGunlukCalismaFormuService.getRaporDetail({ mode: 1, todayDate: this.todayDate })
      .toPromise().then(data => {
        if (data.success) {
          data.data.forEach(form => {
            let tirKamyonRapor: TirKamyonRapor;

            const index = this.gunlukRapor.tirKamyonRapor.findIndex(d => {
              return d.tirKamyon === form.tirKamyon.plaka;
            });

            if (index === -1) {

              const yuklemeYeri = new YuklemeYeri(form.yuklemeYeri, +form.seferSayisi);
              const dokumYeri = new DokumYeri(form.dokumsahasi.name, +form.seferSayisi);

              tirKamyonRapor = new TirKamyonRapor(
                this.todayDate,
                form.tirKamyon.plaka,
                form.personel.name + ' ' + form.personel.surname,
                form.imzalimi ? 'İmzalı' : 'İmzasız',
                this.getToplamTonaj(form.tonajList)
              );

              tirKamyonRapor.yuklemeYeriList.push(yuklemeYeri);
              tirKamyonRapor.dokumYeriList.push(dokumYeri);

              this.gunlukRapor.tirKamyonRapor.push(tirKamyonRapor);
            } else {

              tirKamyonRapor = this.gunlukRapor.tirKamyonRapor[index];

              tirKamyonRapor.toplamTonaj = tirKamyonRapor.toplamTonaj + this.getToplamTonaj(form.tonajList);

              const yuklemeYeriListIndex = tirKamyonRapor.yuklemeYeriList.findIndex(d => {
                return d.name === form.yuklemeYeri;
              });

              const dokumYeriListIndex = tirKamyonRapor.dokumYeriList.findIndex(d => {
                return d.name === form.dokumsahasi.name;
              });

              if (yuklemeYeriListIndex === -1) {
                tirKamyonRapor.yuklemeYeriList.push(new YuklemeYeri(form.yuklemeYeri, +form.seferSayisi));
              } else {
                const yuk = tirKamyonRapor.yuklemeYeriList[yuklemeYeriListIndex];
                yuk.value = yuk.value + (+form.seferSayisi);
                tirKamyonRapor.yuklemeYeriList.splice(yuklemeYeriListIndex, 1, yuk);
              }

              if (dokumYeriListIndex === -1) {
                tirKamyonRapor.dokumYeriList.push(new DokumYeri(form.dokumsahasi.name, +form.seferSayisi));
              } else {
                const dok = tirKamyonRapor.dokumYeriList[dokumYeriListIndex];
                dok.value = dok.value + (+form.seferSayisi);
                tirKamyonRapor.dokumYeriList.splice(dokumYeriListIndex, 1, dok);
              }
              this.gunlukRapor.tirKamyonRapor.splice(index, 1, tirKamyonRapor);
            }

          });

        }
      }).catch(err => { });

  }

  getToplamTonaj(tonajList: string[]): number {
    let tonajTop = 0;

    if (tonajList !== undefined) {
      tonajList.forEach(tonaj => {
        console.log(parseFloat(tonaj));

        tonajTop = tonajTop + (parseFloat(tonaj) ? +tonaj : 0);
      });
    }

    return tonajTop;
  }

  excelExport(data) {

    /* generate worksheet */

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.todayDate);

    /* save to file */
    XLSX.writeFile(wb, 'gunluk-rapor-' + this.todayDate + '.xlsx');
  }

  generatePDF(data) {
    // var data = document.getElementById('excel-table');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

}
