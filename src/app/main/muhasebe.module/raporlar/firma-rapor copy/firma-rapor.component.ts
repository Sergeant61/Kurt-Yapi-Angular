import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { IsMakinesiGunlukCalismaFormuService } from 'src/app/main/rest.module/is-makinesi-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { FirmaRapor, AracRapor } from 'src/app/main/models/raporlar/FirmaRapor';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { Firma } from 'src/app/main/models/Firma';

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

  startDate: string = this.sDate.toISOString().slice(0, 10);
  lastDate: string = this.lDate.toISOString().slice(0, 10);

  firmaRaporList: FirmaRapor[] = [];
  firmaList: Firma[] = [];

  tablo: Array<string[]> = [];
  tablo2: Array<any[]> = [];
  tabloThead: string[] = [];


  constructor(
    public authService: AuthService,
    private firmaService: FirmaService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) { }

  async ngOnInit() {
    await this.getFirmaList();
    this.dateChange();
  }

  dateChange() {

    this.getValues().then(rapor => {

      this.tablo = [];
      this.tablo2 = [];
      this.tabloThead = ['Form Tarihi'];

      rapor.forEach(r => {
        r.isMakinesiList.forEach(is => {
          const i = this.tabloThead.findIndex(d => {
            return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
          });

          if (i === -1) {
            this.tabloThead.push(is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka);
          }
        });
      });

      this.tabloThead.push('Toplam');

      rapor.forEach(r => {
        const satir: string[] = [];
        let top = 0;

        satir.push(this.gfg_Run(new Date(r.formTarihi)));

        r.isMakinesiList.forEach(is => {

          const i = this.tabloThead.findIndex(d => {
            return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
          });

          satir[i] = (+(satir[i] === undefined ? 0 : satir[i]) + (+is.calismaSaati)) + '';

          top = top + (+is.calismaSaati);

        });

        const k = this.tabloThead.findIndex(t => {
          return t === 'Toplam';
        });
        satir[k] = top + '';
        this.tablo.push(satir);
      });

      const tablo1SonSatir: string[] = [];

      if (rapor.length !== 0) {
        tablo1SonSatir.push('Toplam');
      }

      this.tablo.forEach(satirList => {

        for (let index = 1; index < this.tabloThead.length; index++) {
          const s = satirList[index];
          tablo1SonSatir[index] = '' + (+(tablo1SonSatir[index] === undefined ? 0 : tablo1SonSatir[index]) + +(s === undefined ? 0 : s));
        }

      });
      if (this.tablo.length !== 0) {
        this.tablo.push(tablo1SonSatir);
      }

      // Taoplo 2
      if (rapor.length !== 0) {

        for (let index = 1; index < this.tabloThead.length; index++) {
          const satir3: any[] = [];

          satir3.push(this.tabloThead[index]);
          satir3.push(+tablo1SonSatir[index]);


          this.tablo2.push(satir3);
        }
      }

    }).catch(err => { });
  }

  async getValues() {
    this.isLoading = true;
    await this.getIsmakinesi();
    this.isLoading = false;
    return this.firmaRaporList;
  }

  getFirmaList() {
    return this.firmaService.getAll().toPromise().then(data => {
      if (data.success) {
        this.firmaList = data.data;
        this.firmaList.splice(0, 0, new Firma('1', 'Hepsi'));
      }
    }).catch(err => { });
  }

  getIsmakinesi() {
    return this.isMakinesiGunlukCalismaFormuService.getRaporDetail(
      { mode: 2, startDate: this.startDate, lastDate: this.lastDate, firmaId: this.firmaId })
      .toPromise().then(data => {

        if (data.success) {
          this.firmaRaporList = [];

          data.data.forEach(form => {
            let firmaRapor: FirmaRapor;

            const index = this.firmaRaporList.findIndex(f => {
              return f.formTarihi === form.formTarihi;
            });

            if (index === -1) {
              firmaRapor = new FirmaRapor(form.formTarihi);

              firmaRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

              this.firmaRaporList.push(firmaRapor);

            } else {
              firmaRapor = this.firmaRaporList[index];

              const i = firmaRapor.isMakinesiList.findIndex(m => {
                return m.isMakinesi._id === form.isMakinesi._id;
              });

              if (i === -1) {
                firmaRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

              } else {
                const aracRapor = firmaRapor.isMakinesiList[i];
                aracRapor.calismaSaati = ((+aracRapor.calismaSaati) + (+form.calismaSaati)) + '';

                firmaRapor.isMakinesiList.splice(i, 1, aracRapor);
              }
              this.firmaRaporList.splice(index, 1, firmaRapor);
            }

          });
        }
      }).catch(err => { });

  }

  changeBirim(i) {
    this.tablo2[i][3] = (+this.tablo2[i][2] * +this.tablo2[i][1]);

    this.tablo2[this.tablo2.length - 1][3] = 0;

    let topla = 0;
    for (let index = 0; index < this.tablo2.length - 1; index++) {
      topla = topla + +(this.tablo2[index][3] === undefined ? 0 : this.tablo2[index][3]);
    }

    this.tablo2[this.tablo2.length - 1][3] = topla;

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
    // const d3 = document.getElementById('excelTable3');

    const tableAll = document.createElement('table');
    tableAll.innerHTML = '<table>' + d1.innerHTML + '<tr><th></th></tr></table>' +
      '<table>' + d2.innerHTML + '<tr><th></th></tr></table>';

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
