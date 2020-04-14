import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../rest.module/auth.service';
import { IsMakinesiGunlukCalismaFormuService } from '../../rest.module/is-makinesi-gunluk-calisma-formu.service';
import { Mode } from '../../enums/mode.enum';
import { IsMakinesiGunlukCalisma } from '../../models/IsMakinesiGunlukCalisma';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-is-makinesi-calisma-formu',
  templateUrl: './is-makinesi-calisma-formu.component.html',
  styleUrls: ['./is-makinesi-calisma-formu.component.css']
})
export class IsMakinesiCalismaFormuComponent implements OnInit {

  isMakinesiGunlukCalismaFormuList: IsMakinesiGunlukCalisma[] = null;
  selectedIsMakinesiGunlukCalisma: IsMakinesiGunlukCalisma = new IsMakinesiGunlukCalisma();
  onayIsMakinesiGunlukCalisma: IsMakinesiGunlukCalisma = new IsMakinesiGunlukCalisma();
  baseUrl: string = environment.baseUrlIsMakinesiCalisma;
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
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.isMakinesiGunlukCalismaFormuService.getLength().subscribe(data => {
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
    this.isMakinesiGunlukCalismaFormuList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    this.isMakinesiGunlukCalismaFormuService.getSkipAndLimit(this.index + '', this.perViewPage + '')
      .subscribe(data => {
        if (data.success) {
          this.isMakinesiGunlukCalismaFormuList = data.data;
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

  setSelected(data: IsMakinesiGunlukCalisma) {
    this.selectedIsMakinesiGunlukCalisma = data;
  }

  async setOnaylaLoading(data: IsMakinesiGunlukCalisma) {
    await this.isMakinesiGunlukCalismaFormuService.getDetail(data._id, Mode.GET_ALL_FIELD).subscribe(res => {
      if (res.success) {
        this.onayIsMakinesiGunlukCalisma = res.data;
      }
    }, err => {

    });
  }

  delete() {
    this.isLoading = true;
    this.isMakinesiGunlukCalismaFormuService.delete(this.selectedIsMakinesiGunlukCalisma._id).subscribe(data => {
      if (data.success) {
        const index = this.isMakinesiGunlukCalismaFormuList.findIndex(makine => data.data._id === makine._id);
        this.isMakinesiGunlukCalismaFormuList.splice(index, 1);
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
    this.isMakinesiGunlukCalismaFormuService.put(this.onayIsMakinesiGunlukCalisma._id,
      { onaylimi: true, onaylayanUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {
          const index = this.isMakinesiGunlukCalismaFormuList.findIndex(makine => data.data._id === makine._id);
          this.isMakinesiGunlukCalismaFormuList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

      });
  }

}
