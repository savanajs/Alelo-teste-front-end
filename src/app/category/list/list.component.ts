import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _router: ActivatedRoute) { }

  public categoryName: string;

  ngOnInit() {
    this._router
        .queryParams
        .subscribe(params => {
            this.categoryName = params['category'];
        });
  }

}
