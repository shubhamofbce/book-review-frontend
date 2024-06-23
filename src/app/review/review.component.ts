import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: any[] = [];
  total_reviews: number = 0;
  average_rating: number = 0;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.fetchReviews(parseInt(bookId, 10));
    }
    else {
      console.error('No book id found in route');
    }
  }

  fetchReviews(bookId: number): void {
    this.reviewService.fetchReviews(bookId).subscribe(
      response => {
        this.reviews = response['reviews'];
        this.total_reviews = response['total_reviews'];
        this.average_rating = response['average_rating'];
      },
      error => {
        console.error('Error fetching reviews', error);
      }
    );
  }
}
