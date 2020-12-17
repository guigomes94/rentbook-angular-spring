import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Rent } from 'src/app/shared/models/rent.model';
import { RentService } from 'src/app/shared/services/rent-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSourceRents: MatTableDataSource<Rent>;
  dataSourceDevolutions: MatTableDataSource<Rent>;
  showColumnsRents = ['title', 'rentDate'];
  showColumnsDevolutions = ['title', 'devolutionDate'];

  constructor(
    private rentService: RentService,
  ) { }

  ngOnInit(): void {
    this.listRents();
    this.listDevolutions();
  }

  listRents() {
    this.rentService.listLastRents().subscribe(data => {
      this.dataSourceRents = new MatTableDataSource(data);
    })
  }

  listDevolutions() {
    this.rentService.listNextDevolutions().subscribe(data => {
      this.dataSourceDevolutions = new MatTableDataSource(data);
    })
  }

}
