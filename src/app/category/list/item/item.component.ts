import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './item.service';
import Utils from '../../../../utils';
import { Item } from './item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: []
})

export class ItemComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {}

  public categoryName: string;
  public idCategory: string;
  public listName: string;
  public idList: string;
  public tasks: Item[];
  public existsTasks = true;

  getTasks() {

    this.itemService.getAll(this.idCategory, this.idList).subscribe(response => {

        if (response && !response.length) {
          this.existsTasks = false;
          return;
        }

        this.tasks = response.map(item => {
          return new Item(
            item.id,
            item.name,
            item.done
          );
        });

    }, () => {

      this.existsTasks = false;

    });

  }

  private update(item: Item): void {

    this.itemService.update(this.idCategory, this.idList, item.id, item).subscribe(() => {

      this.router.navigate(
        [
          '/categories', this.idCategory,
          'lists', this.idList, 'items'
        ],
        {
          queryParams: {
            category: this.categoryName,
            list: this.listName
          }
        }
      );

    }, () => {

      Utils.notify('error');

    });

  }

  onDone(item) {

    item.done = !item.done;

    this.update(item);

  }

  ngOnInit() {

    this.idCategory = this.activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this.activedRoute.snapshot.paramMap.get('idList');

    this.activedRoute.queryParams.subscribe(params => {
        this.categoryName = params.category;
        this.listName = params.list;

        this.getTasks();
    });

  }

}
