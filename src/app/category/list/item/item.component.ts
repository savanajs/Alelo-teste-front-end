import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './item.service';
import Utils from '../../../../utils';
import { Item } from './item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  constructor(private _activedRoute: ActivatedRoute, private _itemService: ItemService, private _router: Router) { }

  public categoryName: string;
  public idCategory: string;
  public listName: string;
  public idList: string;
  public tasks: Item[];
  public existsTasks: boolean = true;

  getTasks(){

    this._itemService.getAll(this.idCategory, this.idList).subscribe(response => {

        if (response && !response.length) {
          this.existsTasks = false;
          return;
        }

        this.tasks = response.map(item => {
          return new Item(
            item.id,
            item.name,
            item.done
          )
        });

      }

    )

  }

  private update(item:Item): void {

    this._itemService.update(this.idCategory, this.idList, item.id, item).subscribe(() => {

      this._router.navigate(['/categories', this.idCategory, 'lists', this.idList, 'items'], {
        queryParams: { category: this.categoryName, list: this.listName }
      });

    }, () => {

      Utils.notify('error');

    });

  }

  onDone(item){

    item.done = !item.done;

    this.update(item);

  }

  ngOnInit() {

    this.idCategory = this._activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this._activedRoute.snapshot.paramMap.get('idList');

    this._activedRoute.queryParams.subscribe(params => {

        this.categoryName = params['category'];
        this.listName = params['list'];

        this.getTasks();

    });

  }

}
