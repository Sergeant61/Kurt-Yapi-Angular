import { Component, OnInit, ViewChild } from '@angular/core';
import { GidenYakitFormu } from '../../models/GidenYakitFormu';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { GidenYakitFormuService } from '../../rest.module/giden-yakit-formu.service';
import { Mode } from '../../enums/mode.enum';

@Component({
  selector: 'app-giden-yakit-formu',
  templateUrl: './giden-yakit-formu.component.html',
  styleUrls: ['./giden-yakit-formu.component.css']
})
export class GidenYakitFormuComponent implements OnInit {

  gidenYakitFormuList: GidenYakitFormu[] = null;
  selectedGelenYakitFormu: GidenYakitFormu = new GidenYakitFormu();
  onayGidenYakitFormu: GidenYakitFormu = new GidenYakitFormu();
  baseUrl: string = environment.baseUrlGidenYakitFormu;
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
    private gidenYakitFormuService: GidenYakitFormuService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.gidenYakitFormuService.getLength().subscribe(data => {
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
    this.gidenYakitFormuList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    this.gidenYakitFormuService.getSkipAndLimit(this.index + '', this.perViewPage + '')
      .subscribe(data => {
        if (data.success) {
          this.gidenYakitFormuList = data.data;
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

  setSelected(data: GidenYakitFormu) {
    this.selectedGelenYakitFormu = data;
  }

  async setOnaylaLoading(data: GidenYakitFormu) {
    await this.gidenYakitFormuService.getDetail(data._id, Mode.GET_ALL_FIELD).subscribe(res => {
      if (res.success) {
        this.onayGidenYakitFormu = res.data;
      }
    }, err => {

    });
  }

  delete() {
    this.isLoading = true;
    this.gidenYakitFormuService.delete(this.selectedGelenYakitFormu._id).subscribe(data => {
      if (data.success) {
        const index = this.gidenYakitFormuList.findIndex(makine => data.data._id === makine._id);
        this.gidenYakitFormuList.splice(index, 1);
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
    this.gidenYakitFormuService.put(this.onayGidenYakitFormu._id,
      { onaylimi: true, onaylayanUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {
          const index = this.gidenYakitFormuList.findIndex(makine => data.data._id === makine._id);
          this.gidenYakitFormuList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

      });
  }

}
