import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  providers: []
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  searchCriteria: string = 'title'; 
  currentPage: number = 1;
  sortCriteria: string = '';

  constructor(private bookService: BookService) { 
  }

  ngOnInit(): void {
    this.bookService.getBooks(this.currentPage).subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
    
  }

  onSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;

    if (event.key === 'Enter') {
      this.bookService.searchBooks(this.searchCriteria, query).subscribe(data => {
        this.books = data;
      });
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.bookService.getBooks(this.currentPage, this.sortCriteria).subscribe(data => {
      this.books = data;
    });
  }

  prevPage(): void {
    this.currentPage--;
    this.bookService.getBooks(this.currentPage, this.sortCriteria).subscribe(data => {
      this.books = data;
    });
  }

  onSortChange(event: any) {
    this.bookService.getBooks(this.currentPage, this.sortCriteria).subscribe(data => {
      this.books = data;
    });
  }

}
