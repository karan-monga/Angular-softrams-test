import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, publishReplay, refCount} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {Member} from "./models/member.model";
import {Observable} from "rxjs";
import {Team} from "./models/team.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  username: string;
  member: Member;

  members$: Observable<Member[]>;
  teams$: Observable<Team[]>;

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
    this.setMember();
  }

  setUsername(name: string): void {
    this.username = name;
  }

  setMember(member?: Member){
    this.member = member ? member : this.member = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      team: '',
      status: ''
    } as Member;
  }

  getMember(): Member{
    return this.member;
  }

  // Returns all members
  getMembers(): Observable<Member[]>{
    return  this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  addMember(memberForm: Member) {
    return this.http.post(`${this.api}/members/`, memberForm).pipe(
        catchError(this.handleError))
  }

  updateMember(memberForm: Member){
    return this.http.patch(`${this.api}/members/` + memberForm.id, memberForm).pipe(
        catchError(this.handleError))
  }

  deleteMember(id: number){
    return this.http.delete(`${this.api}/members/` + id).pipe(
        catchError(this.handleError))
  }

  getTeams() {
    if(!this.teams$) {
      this.teams$ = this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError),
          publishReplay(1), // this tells Rx to cache the latest emitted
          refCount()); // and this tells Rx to keep the Observable alive as long as there are any Subscribers;
    }
    return this.teams$;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}
