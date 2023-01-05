import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;
	returnUrl!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {

      // get return url from query parameters or default to home page
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
     }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      console.log(this.f);
      

      this.loading = true;
      this.userService.login(this.f['username'].value, this.f['password'].value)
          .pipe(first())
          .subscribe({
              next: (res) => {
                console.log(res);
                console.log(this.returnUrl);

                if(res != null || 'undefined') {
                  if(this.returnUrl != null){
                    this.router.navigateByUrl(this.returnUrl)
                    return
                  } 
                  this.router.navigate(["/user-details"])
                }
              },
              error: (error) => {
                console.log(error);
                
                this._snackBar.open(error, 'dismiss', {
                  duration: 3000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.loading = false;
              }
          });
  }

}
