import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../review.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  @Input() bookId: number = 0;
  reviewForm: FormGroup;
  stars: boolean[] = [false, false, false, false, false];


  constructor(private fb: FormBuilder, private reviewService: ReviewService, private snackBar: MatSnackBar) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    });
    this.reviewForm.get('rating')?.valueChanges.subscribe(value => {
      this.updateStars(value);
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = {
        comment: this.reviewForm.get('comment')?.value,
        rating: this.reviewForm.get('rating')?.value
      };

      this.reviewService.submitReview(this.bookId, reviewData).subscribe(
        response => {
          console.log('Review submitted successfully', response);
          this.reviewForm.reset();
        },
        error => {
          console.error('Error submitting review', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  rate(rating: number) {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  updateStars(rating: number) {
    this.stars = this.stars.map((_, index) => index < rating);
  }
}
