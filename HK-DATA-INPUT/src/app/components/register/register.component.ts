import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() toggle: boolean;
@Output() toggleChanged: EventEmitter<boolean> = new EventEmitter();
  constructor(private as: AuthService, private router: Router) { }


  ngOnInit(): void {
    console.log(this.as.user$.subscribe(res => console.log(res)));
  }
  Register(mail, displayName, password, rptpwd, $e) {
    console.log(mail);
    $e.preventDefault();
    let photoURL: any = '';
    if (password === rptpwd) {
      this.as.emailSignIn({ mail, displayName, photoURL, password });
      console.log(mail, displayName, password, rptpwd);
      this.router.navigate(['/user']);
    } else {
      console.log("passwords don't match");
    }

  }
  toggleLogin() {
    this.toggle = !this.toggle;
    this.toggleChanged.emit(this.toggle);
  }

}
