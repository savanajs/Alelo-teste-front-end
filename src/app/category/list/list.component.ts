import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  constructor(private _activedRoute: ActivatedRoute, private _listService: ListService) { }

  public categoryName: string;
  public idCategory: string;
  public tasks: Category[];
  public existsTasks: boolean = true;

  getTasks(){

    this._listService.getAll(this.idCategory).subscribe(response => {

        if (response && !response.length) {
          this.existsTasks = false;
          return;
        }

        this.tasks = response.map(item => {
          return new Category(
            item.id,
            item.name
          )
        });

      }

    )

  }

  ngOnInit() {

    this.idCategory = this._activedRoute.snapshot.paramMap.get('idCategory');

    this._activedRoute.queryParams.subscribe(params => {

        this.categoryName = params['category'];

        this.getTasks();

    });

  }

}
