import { Component, OnInit, ViewChild } from '@angular/core';
import { Personel } from '../../models/Personel';
import { PersonelService } from '../../rest.module/personel.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../rest.module/auth.service';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit {

  selectedPersonel: Personel;
  personelList: Personel[];
  isLoading: boolean = false;
  baseUrl: string = environment.baseUrlPersonel;

  @ViewChild('closebutton') closebutton;

  constructor(public authService: AuthService, private personelService: PersonelService) { }

  ngOnInit(): void {
    this.personelService.getAll()
      .subscribe(data => {
        if (data.success) {
          this.personelList = data.data;
        } else {
          this.personelList = [];
        }

      }, err => { });

  }

  setSelected(data: Personel) {
    this.selectedPersonel = data;
  }

  delete() {
    this.isLoading = true;
    this.personelService.delete(this.selectedPersonel._id).subscribe(data => {
      if (data.success) {
        const index = this.personelList.findIndex(makine => data.data._id === makine._id);
        this.personelList.splice(index, 1);
      }
      this.isLoading = false;
      this.closebutton.nativeElement.click();
    }, err => {

    });

  }

}
