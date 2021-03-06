import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Options, Response } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url: string = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient) {
  }

  getEmployees(options: Options): Observable<Response> {
    const url = `${this.url}?page=${options.page}&size=${options.size}&search=${options.search}&orderBy=${options.orderBy}&orderDir=${options.orderDir}`;
    return this.http.get(url).pipe(map(response => <Response>response));
  }
}
