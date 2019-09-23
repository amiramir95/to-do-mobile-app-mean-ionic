import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  form: FormGroup;
  user: User;
  constructor(private authService: AuthService, private router: Router) {}

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

  onSignUp() {
    if (this.form.invalid) {
      return;
    }
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.authService.createUser(this.user);
    this.router.navigate(['/auth']);
  }
}
