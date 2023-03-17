import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message = '';
  email!: string;
  password!: string;
  userData: any;
  varUserEmail: any;
  userRecord: any;
  varCurrentUser: any;

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private http: HttpClient,
    private builder: FormBuilder,
    public router: Router
  ) {}
  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });


  
  ngOnInit(): void {}

  signIn() {
    if (this.loginform.valid) {
      this.api.getUsers().subscribe((data: any[]) => {
        this.userData = data;
             var varLoginUser = this.userData.filter(
               (item: any) =>
                 item.email === this.loginform.value.email &&
                 item.password === this.loginform.value.password
             );
 

        var varEmail = varLoginUser.map((x: any) => x.role);
        var varVamId = varLoginUser[0].vamid;
        var varUserEmail = varLoginUser[0].email;
        this.api.GetUserByEmail(varUserEmail).subscribe((userRecord: any) => {
          this.userRecord = userRecord;
        });
         var varCurrentUser = varLoginUser[0].name;
        sessionStorage.setItem('currentUser', varCurrentUser);
         sessionStorage.setItem('currentUserVamId', varVamId);

        if (varEmail == 'Associate') {
          this.router.navigateByUrl('resource', {
            state: { vamid: varVamId, userid: this.userRecord.id },
          });
        }
        var varSME = varLoginUser[0].email;
       
        
        if (varEmail == 'SME') {
          // this.router.navigateByUrl('SME');
          this.router.navigateByUrl('SME', {
            state: { name: varSME },
          });
          // console.log(varEmail);
        }
        if (varLoginUser[0].role == 'Manager') {
          this.router.navigateByUrl('company', {
            state: { name: varCurrentUser },
          });
         
        } else {
          this.message = 'Your email or password was not valid';
        }
      });
    }
    else {
      this.message = 'Your email or password was not valid';
    }
  
  }
}
