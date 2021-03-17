import { AuthService } from "../../services/auth.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators,
	NgForm,
} from "@angular/forms";

@Component({
	selector: "app-roles",
	templateUrl: "./roles.component.html",
	styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
	@ViewChild("newRoleForm", { static: false }) newRoleForm: ElementRef;
	selectedAuths: any[] = [];
	authorities: any;
	createRoleForm: FormGroup;
	roles: any = [];
	authoritiesData: any;
	authorityIds = [];

	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.getRoles();
		this.createRoleForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.maxLength(35)]],
			authorityIds: ["", [Validators.required]],
		});
		
	}

	getRoles() {
		this.auth.getRoles().subscribe(
			(res: any) => {
				this.roles = res;
			},
			(err: any) => {}
		);
	}

	toArray(authorities: object) {
		return Object.keys(authorities).map((key) => authorities[key]);
	}

	getAuthorities() {
		this.auth.getAuthorities().subscribe(
			(res: any) => {
				this.authoritiesData = res;
			},
			(err: any) => {}
		);
	}
	openUserForm() {
		this.newRoleForm.nativeElement.style.display = "block";
		this.getAuthorities();
	}

	closeModal() {
		this.newRoleForm.nativeElement.style.display = "none";
		this.createRoleForm.reset();
	}
	onChangeAuthorities(authority) {
		let index = this.authorityIds.indexOf(authority.id);
		this.createRoleForm.markAsDirty();
		if (index == -1) {
			this.authorityIds.push(authority.id);
			this.selectedAuths.push(authority);
		} else {
			this.authorityIds.splice(index, 1);
			this.selectedAuths.splice(index, 1);
		}
	}

	createRole() {
		this.createRoleForm.controls["authorityIds"].patchValue(this.authorityIds);
		if (this.createRoleForm.invalid) {
			this.createRoleForm.controls["name"].markAsTouched();
			this.createRoleForm.controls["authorityIds"].markAsTouched();
		} else {
			this.auth.newRole(this.createRoleForm.value).subscribe(
				(res: any) => {
					alert("Role Created SuccessFully");
					this.closeModal();
					this.getRoles();
				},
				(err: any) => {
					alert(err.error.error);
				}
			);
		}
	}

	deleteRole(userId:any){
        this.auth.deleteRole(userId).subscribe(
          (res: any) => {
            alert("Role deactivate SuccessFully");
            this.getRoles();
          },
          (err: any) => {
          	alert(err.error.error);
          }
        );
      }
}
