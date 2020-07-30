import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router} from '@angular/router';
import {Member} from "../models/member.model";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members : Member[] = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.appService.setMember();
    this.router.navigate(['/member-details']);
  }

  editMemberById(id: number) {
    let index = this.members.findIndex((m: Member) =>  m.id === id);
    this.appService.setMember(this.members[index]);
    this.router.navigate(['/member-details']);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(() => {
      let indexToRemove = this.members.findIndex((m: Member) =>  m.id === id);
      this.members.splice(indexToRemove, 1);
    })
  }
}
