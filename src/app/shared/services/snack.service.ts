import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  authError() {
    this.snackBar.open('Vous devez être authentifié ☝️ ', 'OK', {
      duration: 5000,
    });
  }

  disconnected() {
    this.snackBar.open('Merci de votre passage 😇 à bientôt !', 'OK', {
      duration: 5000,
    });
  }

  connected() {
    this.snackBar.open('Heureux de vous revoir 😍 !', 'X', {
      duration: 5000,
    });
  }
}
