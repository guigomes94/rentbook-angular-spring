import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  success(msg: string): void {
    this.toastr.success(msg, 'Parabéns!')
  }

  error(msg: string): void {
    this.toastr.error(msg, 'ERROR!')
  }
}
