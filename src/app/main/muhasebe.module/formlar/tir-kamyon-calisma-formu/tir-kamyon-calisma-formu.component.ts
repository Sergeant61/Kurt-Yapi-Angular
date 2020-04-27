import { Component, OnInit, ViewChild } from '@angular/core';
import { TirKamyonGunlukCalismaFormuService } from '../../../rest.module/tir-kamyon-gunluk-calisma-formu.service';
import { TirKamyonGunlukCalisma } from '../../../models/TirKamyonGunlukCalisma';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../rest.module/auth.service';
import { Mode } from '../../../enums/mode.enum';


@Component({
  selector: 'app-tir-kamyon-calisma-formu',
  templateUrl: './tir-kamyon-calisma-formu.component.html',
  styleUrls: ['./tir-kamyon-calisma-formu.component.css']
})
export class TirKamyonCalismaFormuComponent implements OnInit {

  tirKamyonCalismaFormuList: TirKamyonGunlukCalisma[] = null;
  selectedTirKamyonCalismaFormu: TirKamyonGunlukCalisma = new TirKamyonGunlukCalisma();
  onayTirKamyonCalismaFormu: TirKamyonGunlukCalisma = new TirKamyonGunlukCalisma();
  baseUrl: string = environment.baseUrlTirKamyonCalisma;
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
    private tirKamyonGunlukCalismaFormuService: TirKamyonGunlukCalismaFormuService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.tirKamyonGunlukCalismaFormuService.getLength().subscribe(data => {
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
    this.tirKamyonCalismaFormuList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    this.tirKamyonGunlukCalismaFormuService.getSkipAndLimit(this.index + '', this.perViewPage + '')
      .subscribe(data => {
        if (data.success) {
          this.tirKamyonCalismaFormuList = data.data;
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

  setSelected(data: TirKamyonGunlukCalisma) {
    this.selectedTirKamyonCalismaFormu = data;
  }

  async setOnaylaLoading(data: TirKamyonGunlukCalisma) {
    await this.tirKamyonGunlukCalismaFormuService.getDetail(data._id, Mode.GET_ALL_FIELD).subscribe(res => {
      if (res.success) {
        this.onayTirKamyonCalismaFormu = res.data;
      }
    }, err => {

    });
  }

  delete() {
    this.isLoading = true;
    this.tirKamyonGunlukCalismaFormuService.delete(this.selectedTirKamyonCalismaFormu._id).subscribe(data => {
      if (data.success) {
        const index = this.tirKamyonCalismaFormuList.findIndex(makine => data.data._id === makine._id);
        this.tirKamyonCalismaFormuList.splice(index, 1);
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
    this.tirKamyonGunlukCalismaFormuService.put(this.onayTirKamyonCalismaFormu._id,
      { onaylimi: true, onaylayanUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {
          const index = this.tirKamyonCalismaFormuList.findIndex(makine => data.data._id === makine._id);
          this.tirKamyonCalismaFormuList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

      });
  }

}
