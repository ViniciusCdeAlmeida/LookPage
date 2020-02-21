import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/service/user.service';
// import { UserGuard } from "./user.guard";

// Pagina para redirecionamento

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  users: any = [];
  subscriptionUser: Subscription;
  // auth = this.guard

  constructor(
    private userService: UserService
    // private guard: UserGuard
  ) { }

  ngOnInit(): void {
    this.users = this.userService.getUser();
  }

}
