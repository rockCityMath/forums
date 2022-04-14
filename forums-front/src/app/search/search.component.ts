import { Component, Input, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/server-interface.service'
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: any = '';
  results: any = [];
  constructor(private searchService: SearchService, private serverService: ServerService) { }

  ngOnInit(): void {
    this.searchService.searchQuery.subscribe(searchQuery => this.query = searchQuery)
    this.searchByTitle();
  }

  searchByTitle(){
    const resultsObservable = this.serverService.searchByTitle(
      {query: this.query}
    )
    resultsObservable.subscribe((data ) => {
      data = Object.values(data)
      this.results = data
    })
  }

  searchByTag(query){

  }

}
