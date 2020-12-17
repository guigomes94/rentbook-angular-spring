import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Book } from 'src/app/shared/models/book.model';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { User } from 'src/app/shared/models/user.model';
import { BookService } from 'src/app/shared/services/book.service';
import { ReservationService } from 'src/app/shared/services/reservation-service.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reservation-form-dialog',
  templateUrl: './reservation-form-dialog.component.html',
  styleUrls: ['./reservation-form-dialog.component.css']
})
export class ReservationFormDialogComponent implements OnInit {

  reservation: Reservation;

  books: Book[];
  users: User[];

  public reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private bookService: BookService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ReservationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reservation = data.data
  }

  ngOnInit(): void {

    this.listUsers();
    this.listBooks();

    if (this.reservation) {
      this.reservationForm = this.fb.group({
        id: [this.reservation.id],
        user: [this.reservation.user, [Validators.required]],
        book: [this.reservation.book, [Validators.required]],
        rentDate: [this.reservation.rentDate, [Validators.required]],
      })
    } else {
      this.reservationForm = this.fb.group({
        user: ['', [Validators.required]],
        book: ['', [Validators.required]],
        rentDate: ['', [Validators.required]],
      })
    }
  }

  listUsers() {
    this.userService.listAll().subscribe(data => {
      this.users = data;
    })
  }

  listBooks() {
    this.bookService.listAll().subscribe(data => {
      this.books = data;
    })
  }

  createOrUpdateReservation(){
    const reservation = this.reservationForm.value;

    let convertRentDate: moment.Moment = moment.utc(reservation.rentDate).local();
    reservation.rentDate = convertRentDate.format("YYYY-MM-DD")

    if (reservation.id) {
      this.reservationService.update(reservation).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.reservationService.add(reservation).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

    this.reservationForm.reset();
  }

  cancel(): void {
    this.dialogRef.close();
    this.reservationForm.reset();
  }

}
