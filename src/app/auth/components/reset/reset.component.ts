import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  form: FormGroup;
  loading = false;
  serverErrorMessage: string;
  serverOkMessage: string;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onClick(): void {
    this.router.navigate(['/auth/login']);
  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email.value;

    try {
      await this.afAuth.sendPasswordResetEmail(email);
      this.serverOkMessage =
        'Vous allez recevoir un email de réinitialisation dans quelque secondes. 🎉';
    } catch (err) {
      this.serverErrorMessage = err;
    }

    this.loading = false;
  }
}
