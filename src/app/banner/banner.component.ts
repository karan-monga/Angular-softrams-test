import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  constructor(public appService: AppService, private router: Router) { }

  logout() {
    this.appService.username = null;
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
