import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router,ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDetails:any;
  constructor(
  	private route: Router,
  	private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  	) { }

  ngOnInit(){
  	  this.userinfo();
  }

  userinfo(){
    setTimeout(() => {    
this.auth.getCurrentUser().subscribe(
      (res: any) => {
         this.userDetails = res;
      },
      (err: any) => {
      }
    );
    }, 1200);
  }
  logout(){
    this.auth.logout().subscribe(
      (res: any) => {
      },
      (err: any) => {
      }
    );
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
