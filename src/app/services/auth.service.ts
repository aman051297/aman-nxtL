import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpBackend,
  HttpParams,
} from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.checkStatus.asObservable();
  // currentUser
  readonly currentUser = environment.BACKEND_HOST + "api/me";

  //logout
  readonly logoutApi = environment.BACKEND_HOST + "api/me/logout";

  //getUsers
  readonly getUsersApi = environment.BACKEND_HOST + "api/users";

  //getroles
  readonly getRolesApi = environment.BACKEND_HOST + "api/roles";

  //newUser
  readonly newUserApi = environment.BACKEND_HOST + "api/user";

  //updateUser
  readonly updateUserApi = environment.BACKEND_HOST + "api/user/";

  //get authorities
  readonly getAuthoritiesApi = environment.BACKEND_HOST + "api/authorities";

  //add role
  readonly newRoleApi = environment.BACKEND_HOST + "api/role";

  //update Role
  readonly updateRoleApi = environment.BACKEND_HOST + "api/role/";

  //logout
  readonly getClientsApi = environment.BACKEND_HOST + "api/clients";

  getCurrentUser() {
    return this.http.get(this.currentUser);
  }

  checkLogin() {
    const token = localStorage.getItem("access_token");
    if (token) {
      this.checkStatus.next(true);
    } else {
      this.checkStatus.next(false);
    }
  }

  logout() {
    return this.http.get(this.logoutApi);
  }

  getUsers() {
    return this.http.get(this.getUsersApi);
  }

  getRoles() {
    return this.http.get(this.getRolesApi);
  }

  newUser(user: any) {
    return this.http.post(this.newUserApi, user);
  }

  updateUser(userId: any, user: any) {
    return this.http.put(this.updateUserApi + userId, user);
  }

  deleteUser(userId: any) {
    return this.http.delete(this.updateUserApi + userId);
  }

  getAuthorities() {
    return this.http.get(this.getAuthoritiesApi);
  }

  newRole(user: any) {
    return this.http.post(this.newRoleApi, user);
  }

  deleteRole(userId: any) {
    return this.http.delete(this.updateRoleApi + userId);
  }

  updateRole(userId: any, user: any) {
    return this.http.put(this.updateRoleApi + userId, user);
  }

  clients() {
    return this.http.get(this.getClientsApi);
  }

  login(user: any) {
    return this.http.post(
      environment.BACKEND_HOST +
        `oauth/token?grant_type=password&username=${user.username}&password=${user.password}`,
      user
    );
  }
}
