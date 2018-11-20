import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {

  constructor( private headerService: HeaderService) {
    this.headerService.Hide();
    this.headerService.ChildActive(true);
  }

  ngOnInit() {
  }

}
