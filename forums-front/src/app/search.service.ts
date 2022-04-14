import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private query = new BehaviorSubject('');
  searchQuery = this.query.asObservable();

  constructor() { }

  nextQuery(query: any){
    this.query.next(query)
  }
}
