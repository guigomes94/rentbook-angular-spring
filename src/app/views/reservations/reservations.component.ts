import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation-service.service';
import { ReservationFormDialogComponent } from './reservation-form-dialog/reservation-form-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css', '../../app.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  reservation: Reservation;
  dataSource: MatTableDataSource<Reservation>;
  showColumns = ['id', 'user', 'title', 'rentDate', 'actions'];

  constructor(
    private reservationService: ReservationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.reservationService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  addReservation(): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe();
  }

  edit(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationFormDialogComponent, {
      minWidth: '450px',
      data: {
        data: reservation,
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  remove(reservation: Reservation): void {
    this.reservationService.remove(reservation.id).subscribe();
  }

}
