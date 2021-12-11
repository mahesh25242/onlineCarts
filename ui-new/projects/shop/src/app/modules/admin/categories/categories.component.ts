import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopProductCategory } from '../../../lib/interfaces';
import { GeneralService, ShopProductCategoryService } from '../../../lib/services';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$!: Observable<ShopProductCategory[]>;
  environment = environment;

  displayedColumns: string[] = ['no', 'name', 'icon', 'status', 'options'];

  constructor(private shopProductCategoryService: ShopProductCategoryService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }


  editCategory(cat: ShopProductCategory | null = null){

    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: cat,

    });


  }

  changeStatus(cat: ShopProductCategory | null = null){
    this.notiflix.confirm( 'Change Status?', `Do you want to change ${cat?.name} status?`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard();
      this.shopProductCategoryService.changeStatus(cat).pipe(mergeMap(res=>{
        return this.shopProductCategoryService.listCategories().pipe(map(cats=>{
          return res;
        }));
      })).subscribe({
        complete: () =>{
          this._snackBar.open(`${cat?.name} Successfully changed status `, 'Close');        
        }
      }).add(() =>{
        this.notiflix.loading.remove();
      });
    });
  }

  deleteCategory(cat: ShopProductCategory | null = null){
    this.notiflix.confirm( 'delete?', `Do you want to delete ${cat?.name}`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard();
      this.shopProductCategoryService.deleteCategory(cat).pipe(mergeMap(res=>{
        return this.shopProductCategoryService.listCategories().pipe(map(cats=>{
          return res;
        }));
      })).subscribe({
        complete: () =>{
          this._snackBar.open(`${cat?.name} Successfully deleted `, 'Close');   
        }
      }).add(() =>{
        this.notiflix.loading.remove();
      });
    });
  }

  ngOnInit(): void {

    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Categories',
      url:'',
      backUrl: ''
    });

    this.categories$ = this.shopProductCategoryService.categories;
  }

}
