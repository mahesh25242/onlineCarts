import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService, GeneralService } from '../../lib/services';
import { Observable } from 'rxjs';
import { User } from '../../lib/interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedUser$: Observable<User | null> | undefined;
  constructor(private userService: UserService,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.generalService.showbanner$.next(true);

  }

  ngOnDestroy(){
    this.generalService.showbanner$.next(false);
  }
}
