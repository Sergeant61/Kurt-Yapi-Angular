import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import { IsMakinesiGunlukCalismaFormuService } from 'src/app/main/rest.module/is-makinesi-gunluk-calisma-formu.service';
import { GunlukRapor } from 'src/app/main/models/raporlar/GunlukRapor';
import { IsMakinesiRapor } from 'src/app/main/models/raporlar/IsMakinesiRapor';
import { TirKamyonRapor, SeferBilgileri } from 'src/app/main/models/raporlar/TirKamyonRapor';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { TonajData } from 'src/app/main/models/TirKamyonGunlukCalisma';


@Component({
  selector: 'app-gunluk-rapor',
  templateUrl: './gunluk-rapor.component.html',
  styleUrls: ['./gunluk-rapor.component.css']
})
export class GunlukRaporComponent implements OnInit {

  isLoading = true;
  gunlukRapor: GunlukRapor = new GunlukRapor();
  baseUrl: string = environment.baseUrlGunlukRapor;
  santiyeList: Santiye[] = [];
  santiyeId = '1';
  todayDate: string = new Date().toISOString().slice(0, 10);
  tablo: Array<string[]> = [];
  tablo2: Array<string[]> = [];
  tirKamyonThead: any[] = [];

  constructor(
    public authService: AuthService,
    private santiyeService: SantiyeService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) { }

  async ngOnInit() {
    await this.getSantiyeList();
    this.dateChange();
  }

  getSantiyeList() {
    return this.santiyeService.getAll().toPromise().then(data => {
      if (data.success) {
        this.santiyeList = data.data;
        this.santiyeId = this.santiyeList[0]._id;
        // this.santiyeList.splice(0, 0, new Santiye('1', 'Hepsi'));
      }
    }).catch(err => { });
  }

  dateChange() {
    this.getValues().then(rapor => {

      this.tablo = [];
      this.tirKamyonThead = [];
      const fark = 2; // satir ile başlık arasında ki kayma yani başlık satırdan fark kadar sonra başlıyor

      // Başlık1 oluşturma
      rapor.tirKamyonRapor.forEach(data => {

        data.seferBilgileri.forEach(yuk => {
          const i = this.tirKamyonThead.findIndex(t => {
            return t.calisilanFirma === yuk.calisilanFirma
              && t.yuklemeYeri === yuk.yuklemeYeri
              && t.dokumYeri === yuk.dokumYeri
              && t.malzeme === yuk.malzeme;
          });

          if (i === -1) {
            this.tirKamyonThead.push(yuk);
          }
        });

      });

      this.tirKamyonThead.push('Toplam Sefer');
      // this.tirKamyonThead.push('Toplam Tonaj');

      // tablo1 oluşturma

      const satirToplamSefer: string[] = [];
      satirToplamSefer.push('Toplam Sefer');

      const satirToplamTonaj: string[] = [];
      satirToplamTonaj.push('Toplam Tonaj');

      rapor.tirKamyonRapor.forEach(data => {
        const satir: string[] = [];

        satir.push(data.personel);
        satir.push(data.tirKamyon);

        let yukT = 0;
        let tonajT = 0;
        data.seferBilgileri.forEach(yuk => {

          const i = this.tirKamyonThead.findIndex(t => {
            return t.calisilanFirma === yuk.calisilanFirma
              && t.yuklemeYeri === yuk.yuklemeYeri
              && t.dokumYeri === yuk.dokumYeri
              && t.malzeme === yuk.malzeme;
          });
          yukT = yukT + yuk.sefer;
          satir[i + fark] = yuk.sefer + '';

          tonajT = tonajT + yuk.toplamTonaj;
          satirToplamTonaj[i + fark] = yuk.toplamTonaj + '';



        });

        const k = this.tirKamyonThead.findIndex(t => {
          return t === 'Toplam Sefer';
        });
        satir[k + fark] = yukT + '';

        this.tablo.push(satir);

      });

      // son satirToplamSefer

      this.tablo.forEach(satirList => {

        for (let index = 0; index < this.tirKamyonThead.length - 1; index++) {
          const s = satirList[index + fark];
          satirToplamSefer[index + fark] =
            '' + (+(satirToplamSefer[index + fark] === undefined ? 0 : satirToplamSefer[index + fark]) + +(s === undefined ? 0 : s));
        }
      });

      // tablo1 son satirlar
      if (this.tablo.length !== 0) {
        this.tablo.push(satirToplamSefer);
        this.tablo.push(satirToplamTonaj);
      }
    });
  }

  async getValues() {
    this.gunlukRapor = new GunlukRapor();
    this.isLoading = true;
    await this.getIsmakinesi();
    await this.getTirKamyon();
    this.isLoading = false;

    return this.gunlukRapor;
  }

  getIsmakinesi() {
    return this.isMakinesiGunlukCalismaFormuService.getRaporDetail({ mode: 1, todayDate: this.todayDate, santiyeId: this.santiyeId })
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
                form.formTuru.name
              ));

          });
        }
      }).catch(err => { });

  }

  getTirKamyon() {
    return this.tirKamyonGunlukCalismaFormuService.getRaporDetail({ mode: 1, todayDate: this.todayDate, santiyeId: this.santiyeId })
      .toPromise().then(data => {
        if (data.success) {
          this.tablo2 = [];

          data.data.forEach(form => {
            let tirKamyonRapor: TirKamyonRapor;

            const index = this.gunlukRapor.tirKamyonRapor.findIndex(d => {
              return d.tirKamyon === form.tirKamyon.plaka && d.personel === form.personel.name + ' ' + form.personel.surname;

              // this.gunlukRapor.tirKamyonRapor listesin eklenmiş veri var ise kontrol sağlıyorum
            });

            form.tonajDataList.forEach(tonajData => {
              const tablo2Satir = [];

              tablo2Satir.push(form.tirKamyon.plaka);
              tablo2Satir.push(form.firma.name);
              tablo2Satir.push(form.malzemeCinsi.name);
              tablo2Satir.push(tonajData.tonaj);
              tablo2Satir.push(tonajData.irsaliyeNo);
              tablo2Satir.push(tonajData.tartimNo);
              this.tablo2.push(tablo2Satir);
            });

            if (index === -1) {
              // listede yok ise ekliyorum

              const seferBilgileri = new SeferBilgileri(
                form.firma.name, form.yuklemeYeri,
                form.dokumsahasi.name, form.malzemeCinsi.name, +form.seferSayisi, this.getToplamTonaj(form.tonajDataList)
              );

              tirKamyonRapor = new TirKamyonRapor(
                this.todayDate,
                form.tirKamyon.plaka,
                form.personel.name + ' ' + form.personel.surname,
              );

              tirKamyonRapor.seferBilgileri.push(seferBilgileri);

              this.gunlukRapor.tirKamyonRapor.push(tirKamyonRapor);
            } else {
              /* listede var ise tirKamyonRapor.seferBilgileri listesini
              aynı şekilde kontrol ederek tekrar üzerlerine ekleme işlemi yapıyorum*/

              tirKamyonRapor = this.gunlukRapor.tirKamyonRapor[index];

              const seferBilgileriListIndex = tirKamyonRapor.seferBilgileri.findIndex(s => {
                return s.calisilanFirma === form.firma.name
                  && s.yuklemeYeri === form.yuklemeYeri
                  && s.dokumYeri === form.dokumsahasi.name
                  && s.malzeme === form.malzemeCinsi.name;
              });

              if (seferBilgileriListIndex === -1) {
                tirKamyonRapor.seferBilgileri.push(new SeferBilgileri(
                  form.firma.name, form.yuklemeYeri,
                  form.dokumsahasi.name, form.malzemeCinsi.name, +form.seferSayisi, this.getToplamTonaj(form.tonajDataList)));
              } else {
                const sefer = tirKamyonRapor.seferBilgileri[seferBilgileriListIndex];

                sefer.toplamTonaj = sefer.toplamTonaj + this.getToplamTonaj(form.tonajDataList);
                sefer.sefer = sefer.sefer + (+form.seferSayisi);

                tirKamyonRapor.seferBilgileri.splice(seferBilgileriListIndex, 1, sefer);
              }
              // splice methodu ile listedeki seçilen indexten dahil olmak üzere 1 öğe sil yeni öğeyi ekle yani update et
              this.gunlukRapor.tirKamyonRapor.splice(index, 1, tirKamyonRapor);
            }

          });

        }
      }).catch(err => { });

  }

  getToplamTonaj(tonajDataList: TonajData[]): number {
    let tonajTop = 0;

    if (tonajDataList !== undefined) {
      tonajDataList.forEach(data => {
        tonajTop = tonajTop + (parseFloat(data.tonaj) ? +data.tonaj : 0);
      });
    }

    return +tonajTop.toFixed(2); // Tonaj oplamı küsüratlı sayı olduğundan basamak 2 ili sınırlandırdım.
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

  excelExportAll() {

    /* generate worksheet */
    const d1 = document.getElementById('excelTable1');
    const d2 = document.getElementById('excelTable2');
    const d3 = document.getElementById('excelTable3');

    const tableAll = document.createElement('table');
    tableAll.innerHTML = '<table>' + d1.innerHTML + '<tr><th></th></tr></table>' +
      '<table>' + d2.innerHTML + '<tr><th></th></tr></table>' +
      '<table>' + d3.innerHTML + '<tr><th></th></tr></table>';

    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableAll);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, this.todayDate + '_1');

    /* save to file */
    XLSX.writeFile(wb, 'gunluk-rapor-' + this.todayDate + '.xlsx');
  }

  pdfExport(data) {
    html2canvas(data, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const doc = new jsPDF('p', 'mm');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // Generated PDF
      doc.save('gunluk-rapor-' + this.todayDate + '.pdf');
    });
  }

  pdfAllExport() {
    const data = document.getElementById('allTable');
    html2canvas(data, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const doc = new jsPDF('p', 'mm');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      // Generated PDF
      doc.save('gunluk-rapor-' + this.todayDate + '.pdf');
    });
  }

}
