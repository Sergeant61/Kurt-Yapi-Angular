import { Component, OnInit, ViewChild } from '@angular/core';
import { SahaOlcumFormu } from 'src/app/main/models/SahaOlcumFormu';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { SahaOlcumFormuService } from 'src/app/main/rest.module/saha-olcum-formu.service';
import { Mode } from 'src/app/main/enums/mode.enum';

@Component({
  selector: 'app-saha-olcum-formu',
  templateUrl: './saha-olcum-formu.component.html',
  styleUrls: ['./saha-olcum-formu.component.css']
})
export class SahaOlcumFormuComponent implements OnInit {

  sahaOlcumFormuList: SahaOlcumFormu[] = null;
  selectedSahaOlcumFormu: SahaOlcumFormu = new SahaOlcumFormu();
  onaySahaOlcumFormu: SahaOlcumFormu = new SahaOlcumFormu();

  baseUrl: string = environment.baseUrlSahaOlcum;
  pageNumbers: Array<number> = new Array();
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonOnay') closebuttonOnay;

  listLength: number = 0;
  selectedPage: number = 1;
  perViewPage: number = 10;
  index: number;

  isLoading: boolean = false;

  constructor(
    public authService: AuthService,
    private sahaOlcumFormuService: SahaOlcumFormuService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.sahaOlcumFormuService.getLength().subscribe(data => {
      if (data.success) {
        this.listLength = data.data;
        this.getPageNumbers();
      }
    });
  }

  getPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.listLength))
      .fill(0).map((a, i) => i + 1);

  }

  getList() {
    this.sahaOlcumFormuList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    this.sahaOlcumFormuService.getSkipAndLimit(this.index + '', this.perViewPage + '')
      .subscribe(data => {
        if (data.success) {
          this.sahaOlcumFormuList = data.data;
        }
      });
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

  setSelected(data: SahaOlcumFormu) {
    this.selectedSahaOlcumFormu = data;
  }

  async setOnaylaLoading(data: SahaOlcumFormu) {
    await this.sahaOlcumFormuService.getDetail(data._id, Mode.GET_ALL_FIELD).subscribe(res => {
      if (res.success) {
        this.onaySahaOlcumFormu = res.data;
      }
    }, err => {

    });
  }

  delete() {
    this.isLoading = true;
    this.sahaOlcumFormuService.delete(this.selectedSahaOlcumFormu._id).subscribe(data => {
      if (data.success) {
        const index = this.sahaOlcumFormuList.findIndex(makine => data.data._id === makine._id);
        this.sahaOlcumFormuList.splice(index, 1);
      }
      this.isLoading = false;
      this.listLength = this.listLength - 1;
      this.getPageNumbers();
      this.closebutton.nativeElement.click();
    }, err => {

    });
  }

  onayla() {
    this.isLoading = true;
    this.sahaOlcumFormuService.put(this.onaySahaOlcumFormu._id,
      { onaylimi: true, onaylayanUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {
          const index = this.sahaOlcumFormuList.findIndex(makine => data.data._id === makine._id);
          this.sahaOlcumFormuList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

      });
  }


}
