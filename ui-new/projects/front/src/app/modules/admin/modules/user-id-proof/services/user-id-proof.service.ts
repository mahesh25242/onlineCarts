import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserIdProof, UserIdProofWithPagination } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserIdProofService {

  constructor(private http: HttpClient) { }

  userids(page: number = 1){
    return this.http.get<UserIdProofWithPagination>(`/admin/userIdProof?page=${page}`);
  }

  changeStatus(idprf: UserIdProof | null){
    return this.http.post<any>(`/admin/userIdProof/changeStatus`, idprf);
  }
}
