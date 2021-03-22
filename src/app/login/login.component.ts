import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  url: any;
  passwordValue: any;
  usernameValue: any;
  clients:any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getClients();
    this.loginForm = this.formBuilder.group({
      select_client: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getClients() {
    let url = "http://103.155.146.44:8087/clients";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic Om54dGxpZmU=",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.clients = res;
      });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem("access_token", res.access_token);
        this.route.navigate(["/dashboard"]);
        alert("login Successfully");
      },
      (err: any) => {
        alert(err.error.message);
      }
    );   
  }
}
