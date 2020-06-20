import { Component, OnInit, ViewChild } from '@angular/core';
import { MalzemeCinsi } from '../../models/MalzemeCinsi';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';
import { MalzemeCinsiService } from '../../rest.module/malzeme-cinsi.service';

@Component({
  selector: 'app-malzeme-cinsi',
  templateUrl: './malzeme-cinsi.component.html',
  styleUrls: ['./malzeme-cinsi.component.css']
})
export class MalzemeCinsiComponent implements OnInit {

  selectedMalzemeCinsi: MalzemeCinsi;
  malzemeCinsiList: MalzemeCinsi[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlMalzemeCinsi;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private malzemeCinsiService: MalzemeCinsiService) { }

  ngOnInit(): void {
    this.malzemeCinsiService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.malzemeCinsiList = data.data;
        } else {
          this.malzemeCinsiList = [];
        }

      }, err => { });

  }

  setSelected(data: MalzemeCinsi) {
    this.selectedMalzemeCinsi = data;
  }

  delete() {
    this.isLoading = true;
    this.malzemeCinsiService.delete(this.selectedMalzemeCinsi._id).subscribe(data => {
      if (data.success) {
        const index = this.malzemeCinsiList.findIndex(makine => data.data._id === makine._id);
        this.malzemeCinsiList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
