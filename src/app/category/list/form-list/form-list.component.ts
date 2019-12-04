import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

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
