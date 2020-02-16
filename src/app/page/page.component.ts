import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../shared/user.model';
import { UserService } from '../shared/service/user.service';
import { UserGuard } from "../user.guard";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  users: any = [];
  subscriptionUser: Subscription;
  auth = this.guard

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private storageService: StorageService,
    private userService: UserService,
    private guard: UserGuard
    // private catService: CategoryService
  ) { }

  ngOnInit(): void {
    // this.subscriptionUser = this.userService.userChanged.subscribe((userss: User[]) => {this.users = userss;});
    this.users = this.userService.getUser();
    // this.users = this.userService.getUser();
  }

}
