import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLoginMessage;

    constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private _route:ActivatedRoute) {
      this.loginForm = formBuilder.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      })
  }

  ngOnInit(){
      this._route.params.subscribe(params => {
        this.invalidLoginMessage = params["invalidLoginMessage"];
      });
  }

  login() {
      console.log(this.loginForm.value);
      var result = this._loginService.login(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value);
      if (!result) {
        // console.log ("Väärä käyttäjätunnus/salasana");
        this.loginForm.controls['password'].setErrors({invalidLogin: true});
      }
  }

}
