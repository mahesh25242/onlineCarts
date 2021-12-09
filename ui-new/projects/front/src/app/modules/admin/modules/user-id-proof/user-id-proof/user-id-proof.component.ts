import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserIdProof, UserIdProofWithPagination } from '../interfaces';
import { UserIdProofService } from '../services';


@Component({
  selector: 'app-user-id-proof',
  templateUrl: './user-id-proof.component.html',
  styleUrls: ['./user-id-proof.component.scss']
})
export class UserIdProofComponent implements OnInit {
  idProofs$!: Observable<UserIdProofWithPagination>;
  private page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  displayedColumns: string[] = ['no', 'name', 'status', 'shop', 'dated'];


  constructor(private userIdProofService: UserIdProofService) { }



  changeStatus(idprf: UserIdProof | null = null){
    // Notiflix.Confirm.Show( 'Change Status?', `Do you want to change ${idprf.name} status?`, 'Yes', 'No', ()=>{
    //   Notiflix.Loading.Arrows();
    //   this.userIdProofService.changeStatus(idprf).subscribe(res=>{
    //     this.page$.next(0)
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Success(`${idprf.name} Successfully chanegd status `);
    //   }, error=>{
    //     Notiflix.Loading.Remove();
    //     Notiflix.Notify.Failure(`unexpected error`);
    //   });
    // }, ()=>{
    //   // No button callback alert('If you say so...');
    // } )
  }
  goto(page: any){
    this.page$.next(page)

  }

  ngOnInit(): void {
    this.idProofs$ = this.page$.asObservable().pipe(mergeMap(res => this.userIdProofService.userids(res)))
  }

}
