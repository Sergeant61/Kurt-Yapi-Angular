import { Component, OnInit, ViewChild } from '@angular/core';
import { GelenYakitFormu } from '../../models/GelenYakitFormu';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { GelenYakitFormuService } from '../../rest.module/gelen-yakit-formu.service';
import { Mode } from '../../enums/mode.enum';

@Component({
  selector: 'app-gelen-yakit-formu',
  templateUrl: './gelen-yakit-formu.component.html',
  styleUrls: ['./gelen-yakit-formu.component.css']
})
export class GelenYakitFormuComponent implements OnInit {

  gelenYakitFormuList: GelenYakitFormu[] = null;
  selectedGelenYakitFormu: GelenYakitFormu = new GelenYakitFormu();
  onayGelenYakitFormu: GelenYakitFormu = new GelenYakitFormu();
  baseUrl: string = environment.baseUrlGelenYakitFormu;
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
    private gelenYakitFormuService: GelenYakitFormuService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.gelenYakitFormuService.getLength().subscribe(data => {
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
    this.gelenYakitFormuList = null;
    this.index = (this.selectedPage - 1) * this.perViewPage;
    this.gelenYakitFormuService.getSkipAndLimit(this.index + '', this.perViewPage + '')
      .subscribe(data => {
        if (data.success) {
          this.gelenYakitFormuList = data.data;
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

  setSelected(data: GelenYakitFormu) {
    this.selectedGelenYakitFormu = data;
  }

  async setOnaylaLoading(data: GelenYakitFormu) {
    await this.gelenYakitFormuService.getDetail(data._id, Mode.GET_ALL_FIELD).subscribe(res => {
      if (res.success) {
        this.onayGelenYakitFormu = res.data;
      }
    }, err => {

    });
  }

  delete() {
    this.isLoading = true;
    this.gelenYakitFormuService.delete(this.selectedGelenYakitFormu._id).subscribe(data => {
      if (data.success) {
        const index = this.gelenYakitFormuList.findIndex(makine => data.data._id === makine._id);
        this.gelenYakitFormuList.splice(index, 1);
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
    this.gelenYakitFormuService.put(this.onayGelenYakitFormu._id,
      { onaylimi: true, onaylayanUserId: this.authService.currentUser._id })
      .subscribe(data => {
        if (data.success) {
          const index = this.gelenYakitFormuList.findIndex(makine => data.data._id === makine._id);
          this.gelenYakitFormuList.splice(index, 1);
        }
        this.isLoading = false;
        this.listLength = this.listLength - 1;
        this.getPageNumbers();
        this.closebuttonOnay.nativeElement.click();

      });
  }

}
