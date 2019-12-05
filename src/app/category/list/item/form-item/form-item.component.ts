import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../../../utils';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: []
})

export class FormItemComponent implements OnInit {

  public pageLoaded = false;
  public task: Item;
  public idCategory: string;
  public categoryName: string;
  public idList: string;
  public listName: string;
  public idItem: string;
  public formAvaliable = true;
  public isUpdated: boolean;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  private insert(): void {

    this.itemService.insert(this.idCategory, this.idList, this.task).subscribe(() => {

      this.router.navigate(
        [
          '/categories',
          this.idCategory,
          'lists',
          this.idList,
          'items'
        ], {
          queryParams: {
            category: this.categoryName,
            list: this.listName
          }
      });

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private update(): void {

    this.itemService.update(this.idCategory, this.idList, this.idItem, this.task).subscribe(() => {

      this.router.navigate(
        [
          '/categories',
          this.idCategory,
          'lists',
          this.idList,
          'items'
        ],
        {
          queryParams: {
            category: this.categoryName,
            list: this.listName
          }
        }
      );

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private getTask(): void {

    this.itemService.get(this.idCategory, this.idList, this.idItem)
      .subscribe(response => {

        this.task = new Item(
          response.id,
          response.name,
          response.done
        );

        this.pageLoaded = true;

      }, () => {

        this.formAvaliable = false;
        this.pageLoaded = true;

      });
  }

  private delete(): void {

    this.itemService.delete(this.idCategory, this.idList, this.idItem).subscribe(() => {

      this.router.navigate(
        [
          '/categories',
          this.idCategory,
          'lists',
          this.idList,
          'items'
        ],
        {
          queryParams: {
            category: this.categoryName,
            list: this.listName
          }
        }
      );

      Utils.notify('success', 'A tarefa foi excluída com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  onSubmit(): void {

    if (this.isUpdated) {

      this.update();

    } else {

      this.insert();

    }

  }

  onDelete(): void {

    const confirm = window.confirm('Gostaria realmente de remover essa tarefa?');

    if (confirm) {

      this.delete();

    }

  }

  ngOnInit() {

    this.task = new Item('', '', false);

    this.idCategory = this.activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this.activedRoute.snapshot.paramMap.get('idList');
    this.idItem = this.activedRoute.snapshot.paramMap.get('idItem');

    this.activedRoute.queryParams.subscribe(params => {

      this.categoryName = params.category;
      this.listName = params.list;

    });

    if (this.idItem) {

      this.isUpdated = true;
      this.getTask();

    } else {

      this.isUpdated = false;
      this.pageLoaded = true;

    }

  }

}
