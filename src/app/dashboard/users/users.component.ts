import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm,
} from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @ViewChild("addUserForm", { static: false }) addUserForm: ElementRef;
  @ViewChild("updateUserForm", { static: false }) updateUserForm: ElementRef;

  createUserForm: FormGroup;
  userUpdateForm: FormGroup;
  sRole: any = [];
  sRoles: any = [];
  roles: any;
  users: any;
  selectedUserId: any;
  constructor(
    private auth: AuthService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(35)]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobileNo: [null],
      contactNo: [null],
      Search: [""],
      roleIds: ["", [Validators.required]],
    });
    this.userUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(35)]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobileNo: [null],
      contactNo: [null],
      Search: [""],
      roleIds: ["", [Validators.required]],
    });
    this.getUsers();
    this.getRoles();
  }

  getRoles() {
    this.auth.getRoles().subscribe(
      (res: any) => {
        this.roles = res;
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  getUsers() {
    this.auth.getUsers().subscribe(
      (res: any) => {
        this.users = res;
      },
      (err: any) => {
        alert(err.error.error);
      }
    );
  }

  openUserForm() {
    this.addUserForm.nativeElement.style.display = "block";
  }

  closeModal() {
    this.addUserForm.nativeElement.style.display = "none";
    this.createUserForm.reset();
  }

  onChangeRole(role) {
    let index = this.sRole.indexOf(role.id);
    this.createUserForm.markAsDirty();
    if (index === -1) {
      this.sRole.push(role.id);
      this.sRoles.push(role);
    } else {
      this.sRole.splice(index, 1);
      this.sRoles.splice(index, 1);
    }
  }

  createUser() {
    this.createUserForm.controls["roleIds"].patchValue(this.sRole);
    if (this.createUserForm.dirty) {
      if (this.createUserForm.invalid || !this.sRole.length) {
        this.createUserForm.controls["name"].markAsTouched();
        this.createUserForm.controls["username"].markAsTouched();
        this.createUserForm.controls["username"].markAsTouched();
        this.createUserForm.controls["email"].markAsTouched();
        this.createUserForm.controls["contactNo"].markAsTouched();
        this.createUserForm.controls["mobileNo"].markAsTouched();
        this.createUserForm.controls["roleIds"].markAsTouched();
      } else {
        this.auth.newUser(this.createUserForm.value).subscribe(
          (res: any) => {
            alert("User Create SuccessFully");
            this.getUsers();
            this.closeModal();
          },
          (err: any) => {
            alert(err.error.message);
          }
        );
      }
    }
  }

  openUpdateUserForm(user: any) {
    this.updateUserForm.nativeElement.style.display = "block";
    this.userUpdateForm.controls.name.setValue(user.name);
    this.userUpdateForm.controls.username.setValue(user.username);
    this.userUpdateForm.controls.email.setValue(user.email);
    this.userUpdateForm.controls.mobileNo.setValue(user.mobileNo);
    this.userUpdateForm.controls.contactNo.setValue(user.contactNo);
    this.userUpdateForm.controls.Search.setValue(user.Search);
    this.selectedUserId = user.id;
  }

  closeModalUpdateUser() {
    this.updateUserForm.nativeElement.style.display = "none";
    this.userUpdateForm.reset();
  }
  updateUser() {
    this.userUpdateForm.controls["roleIds"].patchValue(this.sRole);
    if (this.userUpdateForm.invalid || !this.sRole.length) {
      this.userUpdateForm.controls["name"].markAsTouched();
      this.userUpdateForm.controls["username"].markAsTouched();
      this.userUpdateForm.controls["username"].markAsTouched();
      this.userUpdateForm.controls["email"].markAsTouched();
      this.userUpdateForm.controls["contactNo"].markAsTouched();
      this.userUpdateForm.controls["mobileNo"].markAsTouched();
      this.userUpdateForm.controls["roleIds"].markAsTouched();
    } else {
      this.auth
        .updateUser(this.selectedUserId, this.userUpdateForm.value)
        .subscribe(
          (res: any) => {
            alert("User update SuccessFully");
            this.getUsers();
            this.closeModalUpdateUser();
          },
          (err: any) => {
            alert(err.error.message);
          }
        );
    }
  }

  deleteUser(userId: any) {
    this.auth.deleteUser(userId).subscribe(
      (res: any) => {
        alert("User delete SuccessFully");
        this.getUsers();
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }
}
