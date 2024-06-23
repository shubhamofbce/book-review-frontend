import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any;
}


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'https://book-review-production.up.railway.app'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  submitReview(bookId: number, reviewData: { comment: string, rating: number }) {
    const url = `${this.apiUrl}/api/book/${bookId}/review/`;
    return this.http.post(url, reviewData);
  }
  fetchReviews(bookId: number): Observable<any> {
    const url = `${this.apiUrl}/api/book/${bookId}/review/`;
    return this.http.get<ApiResponse>(url).pipe(map(response => response?.results));
  }
}
