import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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


  constructor(private userIdProofService: UserIdProofService,
    @Inject('NotiflixService') public notiflix: any,
    private _snackBar: MatSnackBar) { }



  changeStatus(idprf: UserIdProof | null = null){    
    this.notiflix.confirm( 'Change Status?', `Do you want to change ${idprf?.name} status?`, 'Yes', 'No', ()=>{
      this.notiflix.Loading.Arrows();
      this.userIdProofService.changeStatus(idprf).subscribe({
        next: res => {
          this._snackBar.open(res?.message, 'Close');
          this.notiflix.Loading.Remove();
          this.notiflix.Toast.Success(res.message);
        },
        error: err => {          
          this.notiflix.Loading.Remove();     
        }
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } )
  }
  goto(page: any){
    this.page$.next(page)

  }

  ngOnInit(): void {
    
    

    this.idProofs$ = this.page$.asObservable().pipe(mergeMap(res => this.userIdProofService.userids(res)))
  }

}
