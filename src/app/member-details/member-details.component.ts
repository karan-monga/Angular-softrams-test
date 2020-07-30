import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from "../models/member.model";
import { Team } from "../models/team.model";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  memberModel: Member;
  memberForm: FormGroup;
  teams : Team[] = [];

  constructor(private fb: FormBuilder, private appService: AppService,
              private router: Router) {}

  ngOnInit() {
    const member: Member = this.appService.getMember();
    this.memberForm = this.fb.group(member);
    this.appService.getTeams().subscribe(teams  => {
      this.teams = teams;

      /** If team does not exist in database, disable form submit */
      const teamControlValue = this.memberForm.controls['team'].value;
      const teamExist = this.teams.findIndex((team) => team.teamName === teamControlValue);
      this.memberForm.controls['team'].setValue(teamExist !== -1 ? teamControlValue : '');
    });
  }

  onSubmit(form: FormGroup) {
      this.memberModel = form.value;
      if(this.memberModel.id){
        this.appService.updateMember(form.value).subscribe(() => {
          this.router.navigate(['/members']);
        });
      }else {
        this.appService.addMember(form.value).subscribe(() => {
          this.router.navigate(['/members']);
        });
      }
  }

  goBack(){
    this.router.navigate(['/members'])
  }
}



