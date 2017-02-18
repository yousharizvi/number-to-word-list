import { Component, EventEmitter } from '@angular/core';

import { ApiService  } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public input:string = '';
  public includeInvalid:boolean = true;
  public words: Array<string>;

  private inputTimer: any; 

  constructor(private apiService: ApiService) {

  }

  onWordsInputType(input: string = '') {
    if(this.inputTimer){
      clearTimeout(this.inputTimer);
    }
    this.inputTimer = setTimeout(()=>{
      if (input === '' || input.length === 0) {
        this.words = [];
      }
      else {
        this.apiService.getMatches({input, validate: !this.includeInvalid})
        .debounceTime(1000)
        .subscribe((response:any) => {
          this.words = response;
        }, err => {
          this.words = [];
        })
      }
    }, 500)
  }
}
