import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	url:any;

  constructor(
  	private route: Router,
  	private formBuilder: FormBuilder,
    private auth: AuthService
  	) { }

 ngOnInit() {
     this.loginForm = this.formBuilder.group({
      select_client:["", Validators.required],
      username:["", Validators.required],
      password: ["", Validators.required],
    });
  }
login(){
 let url = "http://103.155.146.44:8087/oauth/token?grant_type=password&username=ajay&password=12345"
  fetch(url, {
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      "Authorization": "Basic QWxpZ2FyaDpueHRsaWZl"
    }
  })
  .then(res => res.json())
  .then(res => {
    localStorage.setItem("access_token", res.access_token);
    console.log(res)
  })
this.route.navigate(['/dashboard']);
}

  // let url = "http://103.155.146.44:8087/api/me"
  // fetch(url, {
  //   method: "GET",
  //   headers:{
  //     'Content-Type': 'application/json',
  //     "Authorization": "Bearer 656b4126-b7d8-4d90-8f07-528c2525bf76"
  //   }
  // })
  // .then(res => res.json())
  // .then(res => {
  //   console.log(res)
  // })

}