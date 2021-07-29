import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef,  Input,  OnInit,  ViewChild} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import {combineLatest, forkJoin, interval, merge, Observable} from 'rxjs';
import {combineAll, map, mergeMap, startWith, take, tap} from 'rxjs/operators';
import { CreateProductTagComponent } from '../create-product-tag/create-product-tag.component';
import { ProductTagService } from '../services';
import { ProductTag } from '../interfaces';
import { filter, startsWith } from 'lodash';

@Component({
  selector: 'app-product-tag-selection',
  templateUrl: './product-tag-selection.component.html',
  styleUrls: ['./product-tag-selection.component.scss']
})
export class ProductTagSelectionComponent implements OnInit  {
  @Input() shop_product_tags: FormArray;
  tagsApi$: Observable<ProductTag[]>;
  tags$: Observable<ProductTag[]>;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(private productTagService: ProductTagService,
    public dialog: MatDialog,) {
  }


  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.shop_product_tags.removeAt(index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.shop_product_tags.push(new FormControl(event.option.value));
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

  }




  createTag(){
    let dialogRef = this.dialog.open(CreateProductTagComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result?.name){
        this.fruits.push(result?.name);
        this.shop_product_tags.push(new FormControl(result));
      }

    });

  }
  ngOnInit(){


    this.tagsApi$ = this.productTagService.tags();

    this.tags$ = this.fruitCtrl.valueChanges.pipe(mergeMap(res=>{
      return this.productTagService.productTag.pipe(map(tags=>{
        return filter(tags, (tag) => {
          return tag.name.toLowerCase().includes(res);
        })
      }));
    }))

  }
}
