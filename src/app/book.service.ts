import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://book-review-production.up.railway.app/api/books';

  constructor(private http: HttpClient) { }
  getBooks(currentPage: number, sortCriteria: string = ''): Observable<any[]> {
    const params: any = {
      page: currentPage
    };
    if (sortCriteria) {
      params['ordering'] = sortCriteria;
    }
    return this.http.get<ApiResponse>(this.apiUrl, {params}).pipe(
      map(response => response.results)
    );
  }

  getBookById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  
  searchBooks(criteria: string, query: string): Observable<any[]> {  
    const url = `${this.apiUrl}/?${criteria}__icontains=${query}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => response.results)
    );
  }
}
