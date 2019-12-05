import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})

export class ListComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private listService: ListService
  ) {}

  public categoryName: string;
  public idCategory: string;
  public tasks: Category[];
  public existsTasks = true;

  getTasks() {

    this.listService.getAll(this.idCategory).subscribe(response => {

      if (response && !response.length) {
        this.existsTasks = false;
        return;
      }

      this.tasks = response.map(item => {
        return new Category(
          item.id,
          item.name
        );
      }).reverse();

    }, () => {

      this.existsTasks = false;

    });

  }

  ngOnInit() {

    this.idCategory = this.activedRoute.snapshot.paramMap.get('idCategory');

    this.activedRoute.queryParams.subscribe(params => {
      this.categoryName = params.category;
      this.getTasks();
    });

  }

}
