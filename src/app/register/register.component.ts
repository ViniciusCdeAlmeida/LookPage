import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Angular2TokenService } from "angular2-token";
import { StorageService } from '../shared/service/storage.service'
import { Subscription, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  email: string;
  password: string;
  phone: string;
  name: string;
  passwordConfirmation: string;
  user_id: any;
  subscritptionRegister; subscritptionUser: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private router: Router,
    private storageService: StorageService,
    private tokenAuthSerivce: Angular2TokenService
  ) { };

  save() {
    // Grava o usuario se o formulario nao tiver algum campo invalido
    if (this.form.status != 'INVALID') {
      let registerUser = {
        email: this.form.value.email,
        password: this.form.value.password,
        passwordConfirmation: this.form.value.passwordConfirmation,
      };
      let createUser = {
        user_id: '',
        phone: this.form.value.phone,
        name: this.form.value.name,
        user: ''
      }
      this.subscritptionRegister = this.tokenAuthSerivce.registerAccount(registerUser).subscribe(res => {
        createUser.user_id = res.json().data.id;
        this.storageService.addUser(createUser).subscribe(res2 => { }
          , err => {
            console.log("ERROR RAILS");
          }
          , () => { });
      }, err => {
        console.log("ERROR ANGULAR")
      }, () => {
        this.router.navigate(['/page']);
      });
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    // this.subscritptionUser.unsubscribe;
    this.subscritptionRegister.unsubscribe;
  }

  // Inicializador do formulario

  private initForm() {
    this.form = this.fb.group({
      email: new FormControl(this.email, [Validators.required, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: new FormControl(this.passwordConfirmation, [
        Validators.required,
        Validators.minLength(6)
      ]),
      phone: new FormControl(this.phone, [
        Validators.pattern('^([0-9]{5})+-([0-9]{4})+$')
      ]),
      name: new FormControl(this.name, [Validators.required, Validators.maxLength(3)]),
      user_id: new FormControl(this.user_id),
    });
  }

  // Mensagens para o validador

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 1 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 3 characters long' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'passwordConfirmation': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' }
    ],
    'phone': [
      { type: 'pattern', message: 'Enter a valid phone' },
    ]
  }
}
