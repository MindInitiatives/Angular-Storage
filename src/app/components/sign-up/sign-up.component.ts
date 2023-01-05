import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showPassword = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                this._snackBar.open('Registration successful', 'dismiss', {
                  duration: 2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                  this.router.navigate(['../home'], { relativeTo: this.route });
              },
              error: (error) => {
                this._snackBar.open(error.error.message, 'dismiss', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                  this.loading = false;
              }
          });
  }

}
