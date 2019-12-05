import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../../utils';
import { ListService } from '../list.service';
import { List } from '../list';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})

export class FormListComponent implements OnInit {

  public pageLoaded: boolean = false;
  public task: List;
  public idCategory: string;
  public categoryName: string;
  public idList: string;
  public formAvaliable: boolean = true;
  public isUpdated: boolean;

  constructor(private _listService: ListService, private _router: Router, private _activedRoute: ActivatedRoute) { }

  private insert(): void {

    this._listService.insert(this.idCategory, this.task).subscribe(response => {

      this._router.navigate(['/categories', this.idCategory, 'lists', response.id, 'items'], {
        queryParams: { category: this.categoryName, list: response.name }
      });

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private update(): void {

    this._listService.update(this.idCategory, this.idList, this.task).subscribe(() => {

      this._router.navigate(['/categories', this.idCategory, 'lists'], {
        queryParams: { category: this.categoryName }
      });

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private getTask(): void {

    this._listService.get(this.idCategory, this.idList)
      .subscribe(response => {

        this.task = new List(
          response.id,
          response.name
        );

        this.pageLoaded = true;

      }, () => {

        this.formAvaliable = false;
        this.pageLoaded = true;

      });
  }

  private delete(): void {

    this._listService.delete(this.idCategory, this.idList).subscribe(() => {

      this._router.navigate(['/categories', this.idCategory, 'lists'], {
        queryParams: { category: this.categoryName }
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

    this.task = new List("", "");
    this.idCategory = this._activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this._activedRoute.snapshot.paramMap.get('idList');

    this._activedRoute.queryParams.subscribe(params => {

        this.categoryName = params['category'];

    });

    if (this.idList) {

      this.isUpdated = true;
      this.getTask();

    } else {

      this.isUpdated = false;
      this.pageLoaded = true;

    }

  }

}
