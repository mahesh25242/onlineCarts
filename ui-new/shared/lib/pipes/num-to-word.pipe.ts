import { Pipe, PipeTransform } from '@angular/core';
import { ToWords } from 'to-words';

@Pipe({
  name: 'toWord'
})
export class NumToWordPipe implements PipeTransform {
  constructor(){}


  transform(num: number | undefined): unknown {
    const toWords = new ToWords();    
    return num ? toWords.convert(num) : num;                 
  }

}
