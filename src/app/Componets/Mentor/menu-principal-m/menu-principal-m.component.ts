import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-menu-principal-m',
  templateUrl: './menu-principal-m.component.html',
  styleUrls: ['./menu-principal-m.component.css']
})
export class MenuPrincipalMComponent implements OnInit {

  datos: any = {};
  collapsed = true;
  constructor(private loginServices: LoginService) { }
 
  logOut(){
    this.loginServices.logOut();
  }
  ngOnInit(): void {
    this.datos=JSON.parse(localStorage.getItem('payload'));

  }
  
  
}
