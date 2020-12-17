import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Rent } from 'src/app/shared/models/rent.model';
import { RentService } from 'src/app/shared/services/rent-service.service';
import { RentFormDialogComponent } from './rent-form-dialog/rent-form-dialog.component';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css', '../../app.component.css']
})
export class RentsComponent implements OnInit {

  rents: Rent[];
  rent: Rent;
  dataSource: MatTableDataSource<Rent>;
  showColumns = ['id', 'user', 'title', 'rentDate', 'devolutionDate', 'paymentValue','actions'];

  constructor(
    private rentService: RentService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.rentService.listAll().subscribe( data => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data)
      });
  }

  addRent(): void {
    const dialogRef = this.dialog.open(RentFormDialogComponent, {
      minWidth: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dataSource.data.push(res);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  devolution(rent: Rent) {

    const devolution = rent;

    let convertRentDate: moment.Moment = moment.utc(devolution.rentDate).local();
    let convertDevolutionDate: moment.Moment = moment.utc(devolution.devolutionDate).local();
    devolution.rentDate = convertRentDate.format("YYYY-MM-DD")
    devolution.devolutionDate = convertDevolutionDate.format("YYYY-MM-DD")

    this.rentService.update(rent).subscribe(res => {
      if (res) {
        this.dataSource.data.push(res);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    })
  }

}
