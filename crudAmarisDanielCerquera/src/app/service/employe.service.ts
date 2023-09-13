import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeModel } from '../model/employe_model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  URL_API: string = environment.API_EMPLOYE;

  constructor(private httpClient: HttpClient) {

  }

  getEmployees(userId?: number) {
    if (userId) {
      return this.httpClient.get<EmployeModel[]>(this.URL_API + "/" + userId).pipe(map(res => res));
    } else {
      return this.httpClient.get<EmployeModel[]>(this.URL_API).pipe(map(res => res));
    }
  }

  createtEmploye(request: any): Observable<any> {
    return this.httpClient.post<any[]>(this.URL_API, request).pipe(map(res => res));
  }


  updateEmploye(request: any): Observable<any> {
    return this.httpClient.put<any>(this.URL_API, request).pipe(map(resp => resp));
  }

  updateUser(userId: number, userData: any) {
    return this.httpClient.put(this.URL_API + "/" + userId, userData).pipe(map(resp => resp));
  }

  deleteEmploye(id: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.URL_API + "/" + id).pipe(map(res => res));
  }
}
