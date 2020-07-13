import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  loaded = false;
  team: any [] = [];

  constructor(private http: HttpClient) {
    this.loadInfo();
    this.loadTeam();
   }

   private loadInfo() {
    // read json file
    this.http.get('assets/data/data-page.json')
    .subscribe((resp: InfoPage) => {
      this.loaded = true;
      this.info = resp;
    });
   }

   private loadTeam(){
    this.http.get('https://angular-udemy-html.firebaseio.com/team.json')
    .subscribe((resp:any[]) => {
      this.team = resp;
    });
   }
}
