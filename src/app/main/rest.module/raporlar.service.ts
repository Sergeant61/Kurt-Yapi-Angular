import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/ApiResponse';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Firma } from '../models/Firma';
import { map } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { IsMakinesiGunlukCalismaFormuService } from './is-makinesi-gunluk-calisma-formu.service';
import { PauntajAllRapor, PauntajRapor, AracRapor } from '../models/raporlar/FirmaRapor';
import { SahaOlcumFormuService } from './saha-olcum-formu.service';
import { SahaOlcumFormu } from '../models/SahaOlcumFormu';
import { data } from 'jquery';
import { FormTuru } from '../models/FormTuru';
import { Table } from '../models/raporlar/Table';

@Injectable({
  providedIn: 'root'
})
export class RaporlarService {

  constructor(
    private sahaOlcumFormuService: SahaOlcumFormuService,
    private isMakinesiGunlukCalismaFormuService: IsMakinesiGunlukCalismaFormuService
  ) {
  }

  async getIsmakinesi(startDate, lastDate, firmaId, santiyeId): Promise<PauntajAllRapor[]> {
    try {
      let sahaOlcumList: SahaOlcumFormu[] = [];

      const sahaOlcum = await this.sahaOlcumFormuService.getRaporDetail(
        { mode: 2, startDate, lastDate, firmaId, santiyeId })
        .toPromise();
      sahaOlcumList = sahaOlcum.data;

      const gunlukCalisma = await this.isMakinesiGunlukCalismaFormuService.getRaporDetail(
        { mode: 2, startDate, lastDate, firmaId, santiyeId })
        .toPromise();

      if (gunlukCalisma.success && gunlukCalisma.data.length !== 0) {
        const pauntajAllRaporList: PauntajAllRapor[] = [];

        gunlukCalisma.data.forEach(form => {

          // pauntajAllRaporList listesinde kayıtlı form türleri arasında kontrol sağlanıyor.
          const i = pauntajAllRaporList.findIndex(f => {
            return f.formTuru._id === form.formTuru._id;
          });

          const pauntajRaporList: PauntajRapor[] = [];
          let pauntajAllRapor: PauntajAllRapor;
          let pauntajRapor: PauntajRapor;

          if (i === -1) { // eğer pauntajAllRaporListesinde o form türü yoksa ekleniyor

            pauntajRapor = new PauntajRapor(form.formTarihi);
            pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

            pauntajRaporList.push(pauntajRapor);

            pauntajAllRapor = new PauntajAllRapor(form.formTuru);
            pauntajAllRapor.pauntajRaporList = pauntajRaporList;

            pauntajAllRaporList.push(pauntajAllRapor);

          } else { // eğer var ise var olan listenin üzerine ekleniyor.
            pauntajAllRapor = pauntajAllRaporList[i];

            const index = pauntajAllRapor.pauntajRaporList.findIndex(f1 => { // pauntajRaporList içinde tarihlere göre kıyaslama yapılıyor
              return f1.formTarihi === form.formTarihi;
            });

            if (index === -1) { // pauntajRaporListesinde o tarih yoksa ekleniyor

              pauntajRapor = new PauntajRapor(form.formTarihi);
              pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

              pauntajAllRapor.pauntajRaporList.push(pauntajRapor);

            } else { // pauntajRaporListesinde var ise mevcut listeye ekleniyor
              pauntajRapor = pauntajAllRapor.pauntajRaporList[index];

              // pauntajRaporListesinde ismakinesi kontolü yapılıyor
              const l = pauntajRapor.isMakinesiList.findIndex(m => {
                return m.isMakinesi._id === form.isMakinesi._id;
              });

              if (l === -1) { // isMakinesiListesinde yok ise ekleniyor
                pauntajRapor.isMakinesiList.push(new AracRapor(form.isMakinesi, form.calismaSaati, form.calismaSekli));

              } else { // isMakinesiListesinde aynı makina var ise onun hanesi ne ekleniyor
                const aracRapor = pauntajRapor.isMakinesiList[l];
                aracRapor.calismaSaati = ((+aracRapor.calismaSaati) + (+form.calismaSaati)) + '';

                pauntajRapor.isMakinesiList.splice(l, 1, aracRapor);
              }
              pauntajAllRapor.pauntajRaporList.splice(index, 1, pauntajRapor);
            }
            pauntajAllRaporList.splice(i, 1, pauntajAllRapor);
          }
        });

        const aa = pauntajAllRaporList.findIndex(par => { // burada İmzalı Extra lı olan tablo getiriliyor
          return par.formTuru.name === 'İmzalı Extra';
        });

        // Listeye sahaOlcumListesinde var olan ama ana listede olmayan tarihleri ekliyoruz.
        sahaOlcumList.forEach(saha1 => {

          const kk = pauntajAllRaporList[aa].pauntajRaporList.findIndex(puantaj => {
            return saha1.formTarihi === puantaj.formTarihi;
          });

          if (kk === -1) {
            pauntajAllRaporList[aa].pauntajRaporList.push(new PauntajRapor(saha1.formTarihi));
          }

        });

        // Listeyi tarihe göre sıralıyoruz
        pauntajAllRaporList[aa].pauntajRaporList.sort((a, b) => {

          const d1 = new Date(a.formTarihi);
          const d2 = new Date(b.formTarihi);

          if (d1 < d2) {
            return -1;
          } else if (d1 > d2) {
            return 1;
          }
          return 0;
        });

        // Listeye tarihlere göre saha ölçüm listelerini ekliyoruz.
        for (let k = 0; k < pauntajAllRaporList[aa].pauntajRaporList.length; k++) {

          const filtersahaL = sahaOlcumList.filter(saha2 => {

            return saha2.formTarihi === pauntajAllRaporList[aa].pauntajRaporList[k].formTarihi;
          });

          pauntajAllRaporList[aa].pauntajRaporList[k].sahaOlcumList = filtersahaL;
        }
        return pauntajAllRaporList;
      } else {
        return null;
      }
    } catch (err) {
      return Promise.reject(err);
    }

  }

  async createFirmaRaporTable(rapor: PauntajAllRapor[]): Promise<Table<FormTuru>[]> {

    const tabloList = [];

    rapor.forEach(r => {
      const table = new Table<FormTuru>();
      table.thead = ['Form Tarihi'];
      table.data = r.formTuru;

      r.pauntajRaporList.forEach(puantaj => {

        puantaj.isMakinesiList.forEach(is => {
          const i = table.thead.findIndex(d => {
            return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
          });

          if (i === -1) {
            table.thead.push(is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka);
          }
        });

      });

      if (r.formTuru.name !== 'M³ Çalışmalar (İmzasız)') {
        table.thead.push('M³ Saha içi');
        table.thead.push('M³ Saha dışı');
      }

      tabloList.push(table);
    });

    rapor.forEach(r => {

      const k = tabloList.findIndex(tl => {
        return tl.data._id === r.formTuru._id;
      });

      r.pauntajRaporList.forEach(puantaj => {
        const line: any[] = [];
        let top = 0;
        let topM3_sahi_ici = 0;
        let topM3_sahi_disi = 0;

        line.push(this.gfg_Run(new Date(puantaj.formTarihi)));

        puantaj.isMakinesiList.forEach(is => {

          const i = tabloList[k].thead.findIndex(d => {
            return d === is.isMakinesi.makineCinsi + '-' + is.isMakinesi.plaka;
          });

          line[i] = (+(line[i] === undefined ? 0 : line[i]) + (+is.calismaSaati)) + '';

          top = top + (+is.calismaSaati);

        });

        if (puantaj.sahaOlcumList.length > 0) {
          puantaj.sahaOlcumList.forEach(s => {

            if (s.isBirimi.name === 'Saha İçi') {
              topM3_sahi_ici = topM3_sahi_ici + s.m3;
            } else if (s.isBirimi.name === 'Saha Dışı') {
              topM3_sahi_disi = topM3_sahi_disi + s.m3;
            }

          });

          const z = tabloList[k].thead.findIndex(t => {
            return t === 'M³ Saha içi';
          });
          line[z] = topM3_sahi_ici + '';

          const o = tabloList[k].thead.findIndex(t => {
            return t === 'M³ Saha dışı';
          });

          line[o] = topM3_sahi_disi + '';

        }

        tabloList[k].line.push(line);

      });

    });

    tabloList.forEach(tablo => {

      const lastLine: any[] = [];

      const k = tabloList.findIndex(tl => {
        return tl.data._id === tablo.data._id;
      });

      if (tabloList[k].line.length !== 0) {
        lastLine.push('Toplam');
      }

      for (let index = 1; index < tablo.thead.length; index++) {
        tablo.line.forEach(satir => {
          const s = satir[index];

          lastLine[index] = '' + (+(lastLine[index] === undefined ? 0 : lastLine[index]) + +(s === undefined ? 0 : s));

        });

      }

      if (tabloList[k].line.length !== 0) {
        tabloList[k].line.push(lastLine);
      }

    });


    /**
     * Bu for döngüsü tabloda undefined olarak kalan bölümleri '' ile değiştiriyor.
     */

    for (let i = 0; i < tabloList.length; i++) {
      const table = tabloList[i];
      for (let k = 0; k < table.line.length; k++) {
        const line = table.line[k];

        for (let u = 0; u < table.thead.length; u++) {
          const cell = line[u];

          if (cell === undefined) {

            tabloList[i].line[k][u] = '';
          }
        }
      }
    }

    return tabloList;

  }

  gfg_Run(date): string {
    const sdate = date.toJSON().slice(0, 10);
    const nDate = sdate.slice(8, 10) + '/'
      + sdate.slice(5, 7) + '/'
      + sdate.slice(0, 4);
    return nDate;
  }

}
