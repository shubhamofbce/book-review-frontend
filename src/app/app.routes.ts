import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReviewComponent } from './review/review.component';

export const appRoutes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent},
  { path: 'book/:id/reviews', component: ReviewComponent}
];
