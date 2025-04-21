import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donor } from '../models/donors.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {
    constructor(private http: HttpClient) { }

    getDonorsData() : Observable<Donor>{
        return this.http.get('http://localhost:5148/api/donors')
    }
    createDonors(donor : Donor) : Observable<Donor>{
        return this.http.post('http://localhost:5148/api/donors',donor)
    }
    updateDonors(id:number,donor : Donor) : Observable<Donor>{
        return this.http.put(`http://localhost:5148/api/donors/${id}`,donor)
    }
    deleteDonor(id:number): Observable<void>{
        return this.http.delete<void>(`http://localhost:5148/api/donors/${id}`,
            {params:{id:id.toString()}});
    }
    // deleteDonor(id : number) : Observable<void>{
    //     return this.http.delete<void>(`http://localhost:5148/api/donors/${id}`,
    //         {params:{id:id.toString()}});
    // }
    // deleteDonors(arrGift : Donor[] | null) : Observable<void>{
    //     return this.http.post<void>(`http://localhost:5148/api/gifts/deleteProducts`,arrGift)
    // }

}
