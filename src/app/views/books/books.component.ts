import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../../shared/models/book.model';
import { BookService } from '../../shared/services/book.service';
import { BookFormDialogComponent } from './book-form-dialog/book-form-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css', '../../app.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  book: Book;
  dataSource: MatTableDataSource<Book>;
  showColumns = ['id', 'title', 'author', 'available','actions'];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  filter(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  listAll() {
    this.bookService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addBook(): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  edit(Book: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      minWidth: '450px',
      data: {
        data: Book,
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          const indiceAEditar = this.dataSource.data.findIndex(obj => obj.id === res.id);
          this.dataSource.data[indiceAEditar] = res
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      }
    );
  }

  remove(Book: Book): void {
    this.bookService.remove(Book.id).subscribe();
  }

}
