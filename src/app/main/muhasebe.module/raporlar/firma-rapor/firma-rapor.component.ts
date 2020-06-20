import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { TirKamyonGunlukCalismaFormuService } from 'src/app/main/rest.module/tir-kamyon-gunluk-calisma-formu.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { PauntajAllRapor, } from 'src/app/main/models/raporlar/FirmaRapor';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { Firma } from 'src/app/main/models/Firma';
import { Santiye } from 'src/app/main/models/Santiye';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { SahaOlcumFormu } from 'src/app/main/models/SahaOlcumFormu';
import { Table } from 'src/app/main/models/raporlar/Table';
import { FormTuru } from 'src/app/main/models/FormTuru';
import { empty } from 'rxjs';
import { RaporlarService } from 'src/app/main/rest.module/raporlar.service';
import { HakedisService } from 'src/app/main/rest.module/hakedis.service';
import { Hakedis } from 'src/app/main/models/Hakedis';
import { AlertifyService } from 'src/app/main/services/alertify.service';

@Component({
  selector: 'app-firma-rapor',
  templateUrl: './firma-rapor.component.html',
  styleUrls: ['./firma-rapor.component.css']
})
export class FirmaRaporComponent implements OnInit {

  isLoading = true;
  isLoadHakedisBtn = false;
  date = new Date();

  sDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  startDate: string = this.sDate.toISOString().slice(0, 10);
  lastDate: string = this.lDate.toISOString().slice(0, 10);

  firmaId = '1';
  santiyeId = '1';
  errorMessage: string = null;

  sahaOlcumList: SahaOlcumFormu[] = [];
  firmaList: Firma[] = [];
  santiyeList: Santiye[] = [];

  tabloList: Table<FormTuru>[] = [];

  constructor(
    public authService: AuthService,
    private firmaService: FirmaService,
    private santiyeService: SantiyeService,
    private raporlarService: RaporlarService,
    private hakedisService: HakedisService,
    private alertifyService: AlertifyService,
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService,
  ) { }

  async ngOnInit() {
    await this.getFirmaList();
    await this.getSantiyeList();
    this.dateChange();
  }

  async dateChange() {
    this.errorMessage = null;
    this.tabloList = [];

    this.isLoading = true;
    await this.raporlarService.getIsmakinesi(this.startDate, this.lastDate, this.firmaId, this.santiyeId).then(data => {
      const pauntajAllRaporList = data;

      this.raporlarService.createFirmaRaporTable(pauntajAllRaporList).then(tableList => {
        this.tabloList = tableList;
      }).catch(err => {

      });

    }).catch(err => {
    });
    this.isLoading = false;

  }

  async getFirmaList() {
    try {
      const data = await this.firmaService.getAll().toPromise();
      if (data.success) {
        this.firmaList = data.data;
        this.firmaId = this.firmaList[0]._id;
        // this.firmaList.splice(0, 0, new Firma('1', 'Hepsi'));
      }
    } catch (err) { }
  }

  async getSantiyeList() {
    try {
      const data = await this.santiyeService.getAll().toPromise();
      if (data.success) {
        this.santiyeList = data.data;
        this.santiyeId = this.santiyeList[0]._id;
        // this.santiyeList.splice(0, 0, new Santiye('1', 'Hepsi'));
      }
    } catch (err) { }
  }

  async setHakedis() {
    this.isLoadHakedisBtn = true;

    const hakedis = new Hakedis();
    hakedis.firtDate = new Date(this.startDate);
    hakedis.lastDate = new Date(this.lastDate);
    hakedis.firmaId = this.firmaId;
    hakedis.santiyeId = this.santiyeId;
    hakedis.saveUserId = this.authService.currentUser._id;

    const data = await this.hakedisService.post(hakedis).toPromise();

    try {
      if (data.success) {
        this.alertifyService.success('Hakedis firmanın hanesine eklendi.');
      } else {
        this.errorMessage = data.message;
      }
    } catch (err) {
      return Promise.reject(err);
    }

    this.isLoadHakedisBtn = false;

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
