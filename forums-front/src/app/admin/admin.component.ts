import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/server-interface.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private serverService: ServerService) { }

  ngOnInit(): void {

  }

}
