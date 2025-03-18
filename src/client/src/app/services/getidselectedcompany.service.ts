import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIdSelectedCompanyService {

  private idSource = new BehaviorSubject<number | null>(null);
  id$ = this.idSource.asObservable();

  sendId(newId: number) {
    this.idSource.next(newId)
  }
}
