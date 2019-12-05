import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../../../utils';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})

export class FormItemComponent implements OnInit {

  public pageLoaded: boolean = false;
  public task: Item;
  public idCategory: string;
  public categoryName: string;
  public idList: string;
  public listName: string;
  public idItem: string;
  public formAvaliable: boolean = true;
  public isUpdated: boolean;

  constructor(private _itemService: ItemService, private _router: Router, private _activedRoute: ActivatedRoute) { }

  private insert(): void {

    this._itemService.insert(this.idCategory, this.idList, this.task).subscribe(response => {

      this._router.navigate(['/categories', this.idCategory, 'lists', this.idList, 'items'], {
        queryParams: { category: this.categoryName, list: this.listName }
      });

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private update(): void {

    this._itemService.update(this.idCategory, this.idList, this.idItem, this.task).subscribe(() => {

      this._router.navigate(['/categories', this.idCategory, 'lists', this.idList, 'items'], {
        queryParams: { category: this.categoryName, list: this.listName }
      });

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private getTask(): void {

    this._itemService.get(this.idCategory, this.idList, this.idItem)
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

    this._itemService.delete(this.idCategory, this.idList, this.idItem).subscribe(() => {

      this._router.navigate(['/categories', this.idCategory, 'lists', this.idList, 'items'], {
        queryParams: { category: this.categoryName, list: this.listName }
      });

      Utils.notify('success', 'A tarefa foi excluida com sucesso!');

    }, () => {

      Utils.notify('error');

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

    const confirm = window.confirm("Gostaria realmente de remover essa tarefa?");

    if (confirm) {
      this.delete();
    }

  }

  ngOnInit() {

    this.task = new Item("", "", false);

    this.idCategory = this._activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this._activedRoute.snapshot.paramMap.get('idList');
    this.idItem = this._activedRoute.snapshot.paramMap.get('idItem');

    this._activedRoute.queryParams.subscribe(params => {

        this.categoryName = params['category'];
        this.listName = params['list'];

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
