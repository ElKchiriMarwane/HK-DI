import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  toggle = false;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.auth.user$.subscribe(res => console.log(res)));
  }

  goToUser(){
    this.router.navigate(['/user']);
  }
  toggleChangedHandler(toggle: boolean){
    this.toggle = toggle;
    console.log(toggle)
  }

}
