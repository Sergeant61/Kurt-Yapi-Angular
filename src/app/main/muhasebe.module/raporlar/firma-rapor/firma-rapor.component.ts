import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { IsMakinesiGunlukCalismaFormuService } from 'src/app/main/rest.module/is-makinesi-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { FirmaRapor, AracRapor } from 'src/app/main/models/raporlar/FirmaRapor';

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

  startDate: string = this.sDate.toISOString().slice(0, 10);
  lastDate: string = this.lDate.toISOString().slice(0, 10);

  firmaRaporList: FirmaRapor[] = [];

  tablo: Array<string[]> = [];
  tabloThead: string[] = [];


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

      this.tablo = [];
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

      console.log(this.tabloThead);

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

      console.log(this.tablo);

      const satirr: string[] = [];
      satirr.push('Toplam');

      this.tablo.forEach(satirList => {

        for (let index = 2; index < this.tabloThead.length; index++) {
          const s = satirList[index];
          satirr[index] = '' + (+(satirr[index] === undefined ? 0 : satirr[index]) + +(s === undefined ? 0 : s));
        }

      });
      if (this.tablo.length !== 0) {
        this.tablo.push(satirr);
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

  async getValues() {
    this.isLoading = true;

    await this.getIsmakinesi();
    this.isLoading = false;


    return this.firmaRaporList;
  }

  getIsmakinesi() {
    return this.isMakinesiGunlukCalismaFormuService.getRaporDetail({ mode: 2, startDate: this.startDate, lastDate: this.lastDate })
      .toPromise().then(data => {

        if (data.success) {
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

  excelExport(data) {

    /* generate worksheet */

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.startDate + '/' + this.lastDate);

    /* save to file */
    XLSX.writeFile(wb, 'gunluk-rapor-' + this.startDate + '_' + this.lastDate + '.xlsx');
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
      pdf.save('gunluk-rapor-' + this.startDate + '_' + this.lastDate + '.pdf'); // Generated PDF
    });
  }

}
