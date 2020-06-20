import { Component, OnInit, ViewChild } from '@angular/core';
import { FirmaService } from 'src/app/main/rest.module/firma.service';
import { SantiyeService } from 'src/app/main/rest.module/santiye.service';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { environment } from 'src/environments/environment';
import { Firma } from 'src/app/main/models/Firma';
import { Santiye } from 'src/app/main/models/Santiye';
import { HakedisService } from 'src/app/main/rest.module/hakedis.service';
import { Hakedis } from 'src/app/main/models/Hakedis';
import { FirmaCariService } from 'src/app/main/rest.module/firma-cari.service';
import { FirmaCari } from 'src/app/main/models/FirmaCari';
import { AlertifyService } from 'src/app/main/services/alertify.service';

@Component({
  selector: 'app-hakedis-list',
  templateUrl: './hakedis-list.component.html',
  styleUrls: ['./hakedis-list.component.css']
})
export class HakedisListComponent implements OnInit {

  firmaList: Firma[] = [];
  santiyeList: Santiye[] = [];
  hakedisList: Hakedis[] = null;

  selectedHakedis: Hakedis = new Hakedis();

  firmaId = '1';
  santiyeId = '1';
  errorMessage: string;
  isLoading: boolean = true;
  isOnayli: boolean = false;

  baseUrl: string = environment.baseUrlHakedis;
  urls = environment;

  pageNumbers: Array<number> = new Array();
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonOnay') closebuttonOnay;

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
    private alertifyService: AlertifyService,
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

    this.hakedisList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    const hakedis = new Hakedis();
    hakedis.firmaId = this.firmaId;
    hakedis.santiyeId = this.santiyeId;
    hakedis.onaylimi = this.isOnayli;

    try {
      const data = await this.hakedisService.getSkipAndLimit(this.index + '', this.perViewPage + '', hakedis).toPromise();
      if (data.success) {
        console.log(data);

        this.hakedisList = data.data;
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
        const index = this.hakedisList.findIndex(makine => data.data._id === makine._id);
        this.hakedisList.splice(index, 1);
      }
      this.isLoading = false;
      this.listLength = this.listLength - 1;
      this.getPageNumbers();
      this.closebutton.nativeElement.click();
    }, err => {

    });
  }

  onayla(value) {
    this.isLoading = true;
    this.hakedisService.put(this.selectedHakedis._id,
      { onaylimi: true, confirmUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {

          const firmaCari = new FirmaCari();
          firmaCari.hakedisId = this.selectedHakedis._id;
          firmaCari.firmaId = this.selectedHakedis.firma._id;
          firmaCari.santiyeId = this.selectedHakedis.santiye._id;
          firmaCari.borc = this.selectedHakedis.toplamFiyat;
          firmaCari.seriNo = 'Hakedis/' + this.selectedHakedis._id;
          firmaCari.belgeTuru = 'Hakediş';
          firmaCari.aciklama = this.selectedHakedis.firma.name;

          this.firmaCariService.post(firmaCari).toPromise().then(cari => {
            if (cari.success) {
              this.alertifyService.success('Hakediş onaylandı ve Firma Carisine eklendi.');
            }
          }).catch(err => {

          });

          const index = this.hakedisList.findIndex(makine => data.data._id === makine._id);
          this.hakedisList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

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
