import { Injectable } from '@angular/core';

import {ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toast:ToastrService,
   ) { }

  showSuccess(text, tittle){
    this.toast.success(text,tittle,{
      timeOut:2500
    });
    


  }
  showError(text, tittle){
    this.toast.error(text,tittle,{
      timeOut:2500
    });
    
  }
}
