import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService) {
      this.userService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

  logout() {
      this.userService.logout();
  }

}
