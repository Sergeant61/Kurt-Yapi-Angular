import { Component, OnInit, ViewChild } from '@angular/core';
import { TirKamyon } from '../../models/TirKamyon';
import { environment } from 'src/environments/environment';
import { TirKamyonService } from '../../rest.module/tir-kamyon.service';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-tir-kamyon',
  templateUrl: './tir-kamyon.component.html',
  styleUrls: ['./tir-kamyon.component.css']
})
export class TirKamyonComponent implements OnInit {

  selectedTirKamyon: TirKamyon;
  tirKamyonList: TirKamyon[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlTirKamyon;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private tirKamyonService: TirKamyonService) { }

  ngOnInit(): void {
    this.tirKamyonService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.tirKamyonList = data.data;
        } else {
          this.tirKamyonList = [];
        }

      }, err => { });

  }

  setSelected(data: TirKamyon) {
    this.selectedTirKamyon = data;
  }

  delete() {
    this.isLoading = true;
    this.tirKamyonService.delete(this.selectedTirKamyon._id).subscribe(data => {
      if (data.success) {
        const index = this.tirKamyonList.findIndex(makine => data.data._id === makine._id);
        this.tirKamyonList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
