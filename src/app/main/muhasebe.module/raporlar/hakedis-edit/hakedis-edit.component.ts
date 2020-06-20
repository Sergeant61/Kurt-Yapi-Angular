import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/main/models/raporlar/Table';
import { FormTuru } from 'src/app/main/models/FormTuru';
import { AuthService } from 'src/app/main/rest.module/auth.service';
import { AlertifyService } from 'src/app/main/services/alertify.service';
import { RaporlarService } from 'src/app/main/rest.module/raporlar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HakedisService } from 'src/app/main/rest.module/hakedis.service';
import { Hakedis, BirimFiyat } from 'src/app/main/models/Hakedis';

@Component({
  selector: 'app-hakedis-edit',
  templateUrl: './hakedis-edit.component.html',
  styleUrls: ['./hakedis-edit.component.css']
})
export class HakedisEditComponent implements OnInit {

  editing = null;

  isLoading = true;
  isLoadHakedisBtn: boolean = false;

  errorMessage: string = null;
  tabloList: Table<FormTuru>[] = [];
  gelenHakedis: Hakedis;
  tablo2: Array<any[]> = [];

  constructor(
    public authService: AuthService,
    private raporlarService: RaporlarService,
    private hakedisService: HakedisService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService,
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      hakedisService.get(activeRoute.snapshot.params.id).subscribe(data => {
        if (data.success) {
          this.gelenHakedis = data.data;
          this.valueChange();
        } else {
          this.errorMessage = 'Geçersiz id';
        }
      }, err => {

      });
    } else {
      this.gelenHakedis = new Hakedis();
      this.errorMessage = 'Geçersiz id';
    }

  }
  ngOnInit(): void {
  }

  async valueChange() {
    this.errorMessage = null;
    this.tabloList = [];

    this.isLoading = true;
    await this.raporlarService.getIsmakinesi(
      this.getStringDate(this.gelenHakedis.firtDate),
      this.getStringDate(this.gelenHakedis.lastDate),
      this.gelenHakedis.firma._id,
      this.gelenHakedis.santiye._id)
      .then(data => { // puantajTaplosu

        this.raporlarService.createFirmaRaporTable(data).then(tableList => {
          this.tabloList = tableList;

          // Taplo Fiyatlandırma
          this.tablo2 = [];
          for (let index = 1; index < tableList[0].thead.length; index++) {
            const satir3: any[] = [];
            // console.log(tableList[0].line);

            satir3.push(tableList[0].thead[index]);
            satir3.push(+tableList[0].line[tableList[0].line.length - 1][index]);


            this.tablo2.push(satir3);
          }
          const sonSatir: any[] = [];
          sonSatir.push('Toplam');
          sonSatir.push('');
          sonSatir.push('');
          sonSatir.push('');
          this.tablo2.push(sonSatir);

          if (this.gelenHakedis.birimFiyatList !== undefined) {

            for (let i = 0; i < this.gelenHakedis.birimFiyatList.length; i++) {

              for (let l = 0; l < this.tablo2.length; l++) {
                if (this.tablo2[l][0] === this.gelenHakedis.birimFiyatList[i].name) {
                  this.tablo2[l][2] = this.gelenHakedis.birimFiyatList[i].birimFiyat;
                  this.changeBirim(l);
                  break;
                }
              }
            }

          }




        }).catch(err => {
        });

      }).catch(err => {
      });
    this.isLoading = false;

  }

  async save() {

    this.gelenHakedis.birimFiyatList = [];

    this.isLoadHakedisBtn = true;

    for (let i = 0; i < this.tablo2.length - 1; i++) {

      this.gelenHakedis.birimFiyatList.push(
        { name: this.tablo2[i][0], birim: this.tablo2[i][1], birimFiyat: this.tablo2[i][2], toplamfiyat: this.tablo2[i][3] });
    }

    this.gelenHakedis.toplamFiyat = this.tablo2[this.tablo2.length - 1][3];

    console.log(this.gelenHakedis);

    try {
      const data = await this.hakedisService.put(this.gelenHakedis._id, this.gelenHakedis).toPromise();

      if (data.success) {
        this.alertifyService.success('Güncelleme Başarılı');
      } else {
        this.alertifyService.error('Güncelleme Başarısız');
      }

    } catch (err) {
      return Promise.reject(err);
    }

    this.isLoadHakedisBtn = false;

  }

  getStringDate(date) {
    return new Date(date).toISOString().slice(0, 10);
  }

  changeBirim(i) {
    this.tablo2[i][3] = (+this.tablo2[i][2] * +this.tablo2[i][1]);

    this.tablo2[this.tablo2.length - 1][3] = 0;

    let topla = 0;
    for (let index = 0; index < this.tablo2.length - 1; index++) {
      topla = topla + +(this.tablo2[index][3] === undefined ? 0 : this.tablo2[index][3]);
    }

    this.tablo2[this.tablo2.length - 1][3] = topla;

  }

}
