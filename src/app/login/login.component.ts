import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from  '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/service/user.service';
import { StorageService } from '../shared/service/storage.service'

import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email:string;
  password:string;
  teste: any;
  users = [];
  subscriptionUser: Subscription;

  constructor( 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router, 
    private userService: UserService,
    private storageService: StorageService,
    private tokenAuthSerivce:Angular2TokenService, 
    private route: ActivatedRoute
    
    ){};

    signInUser = {
      email: '',
      password: ''
    };

  login() {

    let signInUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    
    this.subscriptionUser = this.tokenAuthSerivce.signIn(signInUser).subscribe(
        res => {
          let idUser = res.json().data.id;
          this.storageService.getUser(idUser).subscribe((resUsr: any) => {
            this.users = resUsr;
            console.log(this.users);
            this.userService.setUsers(this.users);
          });
          this.signInUser;
          this.router.navigate(['/page']);
          this.logout();
        },
        error => {
          console.log(error)}
    )
  };

  logout() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.email, []],
      password: [this.password, []]
    });
  }

}
