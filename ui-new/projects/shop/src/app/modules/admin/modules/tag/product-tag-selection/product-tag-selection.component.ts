import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef,  Input,  OnInit,  ViewChild} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import { CreateProductTagComponent } from '../create-product-tag/create-product-tag.component';
import { ProductTagService } from '../services';
import { ProductTag } from '../interfaces';
import filter from 'lodash/filter';
import loadshMap from 'lodash/map';



@Component({
  selector: 'app-product-tag-selection',
  templateUrl: './product-tag-selection.component.html',
  styleUrls: ['./product-tag-selection.component.scss']
})
export class ProductTagSelectionComponent implements OnInit  {
  @Input() shop_product_tags!: AbstractControl | undefined;
  tagsApi$!: Observable<ProductTag[]>;
  tags$!: Observable<any[]>;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  fruits: string[] = [];


  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private productTagService: ProductTagService,
    public dialog: MatDialog,) {
  }


  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      let shop_product_tags = this.shop_product_tags?.value;
      shop_product_tags.splice(index, 1);
      this.shop_product_tags?.setValue(shop_product_tags);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let shop_product_tags = this.shop_product_tags?.value ?? [];
    shop_product_tags.push(event.option.value);
    this.shop_product_tags?.setValue(shop_product_tags);
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

  }




  createTag(){
    let dialogRef = this.dialog.open(CreateProductTagComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result?.name){
        this.fruits.push(result?.name);
        let shop_product_tags = this.shop_product_tags?.value ?? [];
        shop_product_tags.push(result);

        this.shop_product_tags?.setValue(shop_product_tags);
      }

    });

  }
  ngOnInit(){



    this.fruits = loadshMap(this.shop_product_tags?.value, 'name');

    this.tagsApi$ = this.productTagService.tags();

    this.tags$ = this.fruitCtrl.valueChanges.pipe(mergeMap(res=>{
      return this.productTagService.productTag.pipe(map(tags=>{
        return filter(tags, (tag) => {
          if(tag.name)
            return tag.name.toLowerCase().includes(res);
          return null;
        })
      }));
    }))

  }
}
