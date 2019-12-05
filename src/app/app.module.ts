import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './category/list/list.component';
import { ItemComponent } from './category/list/item/item.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormItemComponent } from './category/list/item/form-item/form-item.component';
import { FormListComponent } from './category/list/form-list/form-list.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { LoadingComponent } from './loading/loading.component';
import { TasksnotfoundComponent } from './category/tasksnotfound/tasksnotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ListComponent,
    ItemComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    FormItemComponent,
    FormListComponent,
    FormCategoryComponent,
    LoadingComponent,
    TasksnotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
