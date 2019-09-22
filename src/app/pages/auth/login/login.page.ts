import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: User;
  form: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = new User();
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.authService.login(this.user);
  }
}
