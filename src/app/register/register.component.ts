import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef} from  '@angular/material/dialog';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {StorageService} from '../shared/service/storage.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  email:string;
  password:string;
  phone:string;
  name:string;
  passwordConfirmation:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private router: Router, 
    private storageService: StorageService
    ){};

  save() {
    // Grava o usuario se o formulario nao tiver algum campo invalido
    if (this.form.status != 'INVALID') {
      let signUpUser = {
        email: this.form.value.email,
        password: this.form.value.password,
        name: this.form.value.name,
        phone: this.form.value.phone,
        date_created: new Date()
      };
      this.storageService.addUser(signUpUser).subscribe(data => signUpUser);
      this.close();
      this.router.navigate(['/home']);
    }
  }
  
    close() {
      this.dialogRef.close();
    }  

  ngOnInit(): void {
    this.initForm();
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
      name: new FormControl(this.name, [Validators.required, Validators.maxLength(3)])
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
