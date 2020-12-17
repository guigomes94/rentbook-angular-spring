import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/shared/models/author.model';
import { Book } from 'src/app/shared/models/book.model';
import { AuthorService } from 'src/app/shared/services/author.service';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-form-dialog',
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.css']
})
export class BookFormDialogComponent implements OnInit {

  book: Book;

  authors: Author[];

  public bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.book = data.data
  }

  ngOnInit(): void {

    this.listAuthors();

    if (this.book) {
      this.bookForm = this.fb.group({
        id: [this.book.id],
        title: [this.book.title, [Validators.required]],
        author: [this.book.author, [Validators.required]],
        available: [this.book.available.toString(), [Validators.required]],
      })
    } else {
      this.bookForm = this.fb.group({
        title: ['', [Validators.required]],
        author: ['', [Validators.required]],
        available: ['', [Validators.required]],
      })
    }
  }

  listAuthors() {
    this.authorService.listAll().subscribe(data => {
      this.authors = data;
    })
  }

  createOrUpdateBook(){
    const book = this.bookForm.value;

    if (book.available === 'true') {
      book.available = true;
    } else {
      book.available = false;
    }

    if (book.id) {
      this.bookService.update(book).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.bookService.add(book).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.bookForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.bookForm.reset();
  }

}
