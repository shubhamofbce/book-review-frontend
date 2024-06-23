import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  imports: [CommonModule, ReviewFormComponent],
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id') || '1';
    this.bookService.getBookById(bookId).subscribe(data => {
      this.book = data;
    });
  }
  viewReviews() {
    this.router.navigate(['book', this.book.id, 'reviews']);
  }
}