import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Book } from 'src/app/shared/models/book.model';
import { Rent } from 'src/app/shared/models/rent.model';
import { User } from 'src/app/shared/models/user.model';
import { BookService } from 'src/app/shared/services/book.service';
import { RentService } from 'src/app/shared/services/rent-service.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-rent-form-dialog',
  templateUrl: './rent-form-dialog.component.html',
  styleUrls: ['./rent-form-dialog.component.css']
})
export class RentFormDialogComponent implements OnInit {

  rent: Rent;

  books: Book[];
  users: User[];

  public rentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentService: RentService,
    private bookService: BookService,
    private userService: UserService,
    public dialogRef: MatDialogRef<RentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rent = data.data
  }

  ngOnInit(): void {

    this.listUsers();
    this.listBooks();

    if (this.rent) {
      this.rentForm = this.fb.group({
        id: [this.rent.id],
        user: [this.rent.user, [Validators.required]],
        book: [this.rent.book, [Validators.required]],
        rentDate: [this.rent.rentDate, [Validators.required]],
        devolutionDate: [this.rent.devolutionDate, [Validators.required]],
      })
    } else {
      this.rentForm = this.fb.group({
        user: ['', [Validators.required]],
        book: ['', [Validators.required]],
        rentDate: ['', [Validators.required]],
        devolutionDate: ['', [Validators.required]],
      })
    }
  }

  listUsers() {
    this.userService.listAll().subscribe(data => {
      this.users = data;
    })
  }

  listBooks() {
    this.bookService.listAvailables().subscribe(data => {
      this.books = data;
    })
  }

  createOrUpdateRent(){
    const rent = this.rentForm.value;

    let convertRentDate: moment.Moment = moment.utc(rent.rentDate).local();
    let convertDevolutionDate: moment.Moment = moment.utc(rent.devolutionDate).local();
    rent.rentDate = convertRentDate.format("YYYY-MM-DD")
    rent.devolutionDate = convertDevolutionDate.format("YYYY-MM-DD")

    if (rent.id) {
      this.rentService.update(rent).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.rentService.add(rent).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.rentForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.rentForm.reset();
  }

}
