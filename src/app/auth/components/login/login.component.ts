import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginWithEmailAndPassword } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Select(AuthState.getLoading) loading$: Observable<boolean>;
  @Select(AuthState.getError) error$: Observable<any>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  onForgetPassword() {
    this.store.dispatch(new Navigate(['/auth/reset']));
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    const email = this.email.value;
    const password = this.password.value;
    this.store.dispatch(new LoginWithEmailAndPassword(email, password));
  }
}
