import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router} from '@angular/router';
// import { UserGuard } from "../user.guard";

import { Angular2TokenService } from "angular2-token";

// Toolbar para multiplas acoes do usuario: Login, Logout e Create User

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    // private guard: UserGuard,
    public tokenGuard: Angular2TokenService){}
  
  // auth = this.guard

  openLogin() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(LoginComponent, dialogConfig);
}
  openRegister() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterComponent, dialogConfig);
  }

  logout(){
    
    this.router.navigate(['/home']);
  }
  
  ngOnInit(): void {
  }

}
