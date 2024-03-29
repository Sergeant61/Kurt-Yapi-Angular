import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hakedis } from 'src/app/main/models/Hakedis';
import { Santiye } from 'src/app/main/models/Santiye';
import { Firma } from 'src/app/main/models/Firma';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { HakedisService } from 'src/app/main/rest.module/hakedis.service';
import { FirmaCariService } from 'src/app/main/rest.module/firma-cari.service';
import { FirmaCari } from 'src/app/main/models/FirmaCari';

@Component({
  selector: 'app-firma-carileri',
  templateUrl: './firma-carileri.component.html',
  styleUrls: ['./firma-carileri.component.css']
})
export class FirmaCarileriComponent implements OnInit {

  firmaList: Firma[] = [];
  santiyeList: Santiye[] = [];

  firmaCariList: FirmaCari[] = null;

  selectedHakedis: Hakedis = new Hakedis();

  firmaId = '1';
  santiyeId = '1';
  errorMessage: string;
  isLoading: boolean = true;

  urls = environment;

  pageNumbers: Array<number> = new Array();
  @ViewChild('closebutton') closebutton;

  listLength: number = 0;
  selectedPage: number = 1;
  perViewPage: number = 10;
  index: number;

  constructor(
    public authService: AuthService,
    private firmaService: FirmaService,
    private santiyeService: SantiyeService,
    private hakedisService: HakedisService,
    private firmaCariService: FirmaCariService,
  ) { }

  async ngOnInit() {
    await this.getFirmaList();
    await this.getSantiyeList();
    await this.getList();
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

  async getList() {
    this.isLoading = true;

    this.firmaCariList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    const sendData = { firmaId: this.firmaId, santiyeId: this.santiyeId };

    try {
      const data = await this.firmaCariService.getSkipAndLimit(this.index + '', this.perViewPage + '', sendData).toPromise();
      if (data.success) {
        console.log(data);

        this.firmaCariList = data.data;
        this.listLength = data.length;
        this.getPageNumbers();
      }
    } catch (error) {

    }
    this.isLoading = false;

  }

  setSelected(value) {
    this.selectedHakedis = value;
  }

  delete() {
    this.isLoading = true;
    this.hakedisService.delete(this.selectedHakedis._id).subscribe(data => {
      if (data.success) {
        const index = this.firmaCariList.findIndex(makine => data.data._id === makine._id);
        this.firmaCariList.splice(index, 1);
      }
      this.isLoading = false;
      this.listLength = this.listLength - 1;
      this.getPageNumbers();
      this.closebutton.nativeElement.click();
    }, err => {

    });
  }

  getPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.listLength))
      .fill(0).map((a, i) => i + 1);
  }

  changePage(p: number) {
    this.selectedPage = p;
    this.getList();
  }

  changePageSize(size: number) {
    this.perViewPage = size;
    this.getPageNumbers();
    this.changePage(1);
  }

}
