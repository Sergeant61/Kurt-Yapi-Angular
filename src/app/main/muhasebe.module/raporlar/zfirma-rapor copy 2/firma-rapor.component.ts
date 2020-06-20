import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { IsMakinesiGunlukCalismaFormuService } from 'src/app/main/rest.module/is-makinesi-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { PauntajAllRapor, PauntajRapor, AracRapor } from 'src/app/main/models/raporlar/FirmaRapor';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { Firma } from 'src/app/main/models/Firma';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { SahaOlcumFormuService } from 'src/app/main/rest.module/saha-olcum-formu.service';
import { SahaOlcumFormu } from 'src/app/main/models/SahaOlcumFormu';
import { Table } from 'src/app/main/models/raporlar/Table';
import { FormTuru } from 'src/app/main/models/FormTuru';

@Component({
  selector: 'app-firma-rapor',
  templateUrl: './firma-rapor.component.html',
  styleUrls: ['./firma-rapor.component.css']
})
export class FirmaRaporComponent implements OnInit {

  isLoading = true;
  date = new Date();

  sDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  firmaId = '1';
  santiyeId = '1';

  startDate: string = this.sDate.toISOString().slice(0, 10);
  lastDate: string = this.lDate.toISOString().slice(0, 10);

  pauntajAllRaporList: PauntajAllRapor[] = [];
  sahaOlcumList: SahaOlcumFormu[] = [];
  firmaList: Firma[] = [];
  santiyeList: Santiye[] = [];

  table1 = new Table<void>();
  tabloList: Table<FormTuru>[] = [];

  constructor(
    public authService: AuthService,
    private firmaService: FirmaService,
    private santiyeService: SantiyeService,
    private sahaOlcumFormuService: SahaOlcumFormuService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) { }

  async ngOnInit() {
    await this.getFirmaList();
    await this.getSantiyeList();
    this.dateChange();
  }

  dateChange() {

    this.getValues().then(rapor => {

      this.tabloList = [];


      rapor.forEach(r => {
        const table = new Table<FormTuru>();
        table.thead = ['Form Tarihi'];
        table.data = r.formTuru;

        r.pauntajRaporList.forEach(puantaj => {

          puantaj.isMakinesiList.forEach(is => {
            const i = table.thead.findIndex(d => {
              return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
            });

            if (i === -1) {
              table.thead.push(is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka);
            }
          });

        });

        if (r.formTuru.name !== 'M³ Çalışmalar (İmzasız)') {
          table.thead.push('M³ Saha içi');
          table.thead.push('M³ Saha dışı');
        }

        this.tabloList.push(table);
      });

      rapor.forEach(r => {

        const k = this.tabloList.findIndex(tl => {
          return tl.data._id === r.formTuru._id;
        });

        r.pauntajRaporList.forEach(puantaj => {
          const line: any[] = [];
          let top = 0;
          let topM3_sahi_ici = 0;
          let topM3_sahi_disi = 0;

          line.push(this.gfg_Run(new Date(puantaj.formTarihi)));

          puantaj.isMakinesiList.forEach(is => {

            const i = this.tabloList[k].thead.findIndex(d => {
              return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
            });

            line[i] = (+(line[i] === undefined ? 0 : line[i]) + (+is.calismaSaati)) + '';

            top = top + (+is.calismaSaati);

          });


          if (puantaj.sahaOlcumList.length > 0) {
            puantaj.sahaOlcumList.forEach(s => {

              if (s.isBirimi.name === 'Saha İçi') {
                topM3_sahi_ici = topM3_sahi_ici + s.m3;
              } else if (s.isBirimi.name === 'Saha Dışı') {
                topM3_sahi_disi = topM3_sahi_disi + s.m3;
              }

            });

            const z = this.tabloList[k].thead.findIndex(t => {
              return t === 'M³ Saha içi';
            });
            line[z] = topM3_sahi_ici + '';

            const o = this.tabloList[k].thead.findIndex(t => {
              return t === 'M³ Saha dışı';
            });

            line[o] = topM3_sahi_disi + '';

          }

          this.tabloList[k].line.push(line);

        });

      });

      this.tabloList.forEach(tablo => {

        const lastLine: any[] = [];

        const k = this.tabloList.findIndex(tl => {
          return tl.data._id === tablo.data._id;
        });

        if (this.tabloList[k].line.length !== 0) {
          lastLine.push('Toplam');
        }

        for (let index = 1; index < tablo.thead.length; index++) {
          tablo.line.forEach(satir => {
            const s = satir[index];

            lastLine[index] = '' + (+(lastLine[index] === undefined ? 0 : lastLine[index]) + +(s === undefined ? 0 : s));

          });

        }

        if (this.tabloList[k].line.length !== 0) {
          this.tabloList[k].line.push(lastLine);
        }

      });


    }).catch(err => { });

  }

  async getValues() {
    this.isLoading = true;
    await this.getSahaOlcum();
    await this.getIsmakinesi();
    this.isLoading = false;
    return this.pauntajAllRaporList;
  }

  getFirmaList() {
    return this.firmaService.getAll().toPromise().then(data => {
      if (data.success) {
        this.firmaList = data.data;
        this.firmaList.splice(0, 0, new Firma('1', 'Hepsi'));
      }
    }).catch(err => { });
  }

  getSantiyeList() {
    return this.santiyeService.getAll().toPromise().then(data => {
      if (data.success) {
        this.santiyeList = data.data;
        this.santiyeList.splice(0, 0, new Santiye('1', 'Hepsi'));
      }
    }).catch(err => { });
  }

  getIsmakinesi() {
    return this.isMakinesiGunlukCalismaFormuService.getRaporDetail(
      { mode: 2, startDate: this.startDate, lastDate: this.lastDate, firmaId: this.firmaId, santiyeId: this.santiyeId })
      .toPromise().then(data => {
        this.table1.line = [];
        this.table1.thead = ['Form Tarihi', 'Makina Cinsi', 'Yapılan İşin Tanımı', 'Çalışma Şekli', 'Çalışma Birimi', 'İmzalı/İmzasız'];

        if (data.success) {

          // Taplo 1

          data.data.forEach(r => {

            const satir: any[] = [];

            satir.push(this.gfg_Run(new Date(r.formTarihi)));
            satir.push(r.isMakinesi.makineCinsi);
            satir.push(r.yapilinIsTanimi);
            satir.push(r.calismaSekli);
            satir.push(r.calismaSaati);
            satir.push(r.formTuru.name);

            this.table1.line.push(satir);

          });

          this.pauntajAllRaporList = [];

          data.data.forEach(form => {

            // pauntajAllRaporList listesinde kayıtlı form türleri arasında kontrol sağlanıyor.
            const i = this.pauntajAllRaporList.findIndex(f => {
              return f.formTuru._id === form.formTuru._id;
            });

            const pauntajRaporList: PauntajRapor[] = [];
            let pauntajAllRapor: PauntajAllRapor;
            let pauntajRapor: PauntajRapor;

            if (i === -1) {

              pauntajRapor = new PauntajRapor(form.formTarihi);
              pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

              pauntajRaporList.push(pauntajRapor);

              pauntajAllRapor = new PauntajAllRapor(form.formTuru);
              pauntajAllRapor.pauntajRaporList = pauntajRaporList;

              this.pauntajAllRaporList.push(pauntajAllRapor);

            } else {
              pauntajAllRapor = this.pauntajAllRaporList[i];

              const index = pauntajAllRapor.pauntajRaporList.findIndex(f => {
                return f.formTarihi === form.formTarihi;
              });

              if (index === -1) {

                pauntajRapor = new PauntajRapor(form.formTarihi);
                pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

                pauntajAllRapor.pauntajRaporList.push(pauntajRapor);

              } else {
                pauntajRapor = pauntajAllRapor.pauntajRaporList[index];

                const l = pauntajRapor.isMakinesiList.findIndex(m => {
                  return m.isMakinesi._id === form.isMakinesi._id;
                });

                if (l === -1) {
                  pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

                } else {
                  const aracRapor = pauntajRapor.isMakinesiList[l];
                  aracRapor.calismaSaati = ((+aracRapor.calismaSaati) + (+form.calismaSaati)) + '';

                  pauntajRapor.isMakinesiList.splice(l, 1, aracRapor);
                }

                pauntajAllRapor.pauntajRaporList.splice(index, 1, pauntajRapor);

              }

              this.pauntajAllRaporList.splice(i, 1, pauntajAllRapor);
            }
          });

          const aa = this.pauntajAllRaporList.findIndex(par => {
            return par.formTuru.name === 'İmzalı Extra';
          });

          for (let k = 0; k < this.pauntajAllRaporList[aa].pauntajRaporList.length; k++) {

            const filtersahaL = this.sahaOlcumList.filter(saha => {
              return saha.formTarihi === this.pauntajAllRaporList[aa].pauntajRaporList[k].formTarihi;
            });

            this.pauntajAllRaporList[aa].pauntajRaporList[k].sahaOlcumList = filtersahaL;

          }



        }
      }).catch(err => { });

  }

  getSahaOlcum() {
    return this.sahaOlcumFormuService.getRaporDetail(
      { mode: 2, startDate: this.startDate, lastDate: this.lastDate, firmaId: this.firmaId, santiyeId: this.santiyeId })
      .toPromise().then(data => {
        if (data.success) {
          this.sahaOlcumList = data.data;
        }
      }).catch(err => { });
  }

  gfg_Run(date): string {
    const sdate = date.toJSON().slice(0, 10);
    const nDate = sdate.slice(8, 10) + '/'
      + sdate.slice(5, 7) + '/'
      + sdate.slice(0, 4);
    return nDate;
  }

  excelExport(data) {

    /* generate worksheet */

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.startDate);

    /* save to file */
    XLSX.writeFile(wb, this.startDate + '_' + this.lastDate + '.xlsx');
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
    XLSX.utils.book_append_sheet(wb, ws1, this.startDate + '_1');

    /* save to file */
    XLSX.writeFile(wb, this.startDate + '_' + this.lastDate + '.xlsx');
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
      doc.save('gunluk-rapor-' + this.startDate + '_' + this.lastDate + '.pdf');
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
      doc.save('gunluk-rapor-' + this.startDate + '_' + this.lastDate + '.pdf');
    });
  }
}
