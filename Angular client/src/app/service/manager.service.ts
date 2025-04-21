import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService implements CanActivate{

  isManager: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem('isManager') === 'true');
  constructor(private http: HttpClient) { }

  CheckManager(password:string):Observable<any>{
    const params=new HttpParams().set('password',password)
      return this.http.post("http://localhost:5148/api/managers",null,{params})
  }

  setManager(isManager: boolean): void { 
    sessionStorage.setItem('isManager',String(isManager))
    this.isManager.next(isManager); 
  }
  getManager(){
    return this.isManager;
  }
  canActivate(){
     return this.getManager()
    }
}
