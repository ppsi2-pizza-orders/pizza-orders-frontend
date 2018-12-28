import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getObservableUser().subscribe(user => this.user = user);
  }

}
