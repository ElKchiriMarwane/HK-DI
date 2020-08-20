import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
@Input () toggle: boolean;
  @Output() toggleChanged: EventEmitter<boolean> = new EventEmitter();
  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  LogIn(email, password, $e){
    $e.preventDefault();
    this.as.emailLogIn({email, password});
    this.router.navigate(['/user']);
  }
  toggleRegister(){
    this.toggle = !this.toggle;
    this.toggleChanged.emit(this.toggle);
    console.log(this.toggle);
  }

}
