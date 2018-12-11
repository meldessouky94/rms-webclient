import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  code;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.code = params['code'];
        console.log(this.code); // Print the parameter to the console.
      }
    );
  }

  ngOnInit() {
    this.userService.getToken(this.code);
    console.log(this.userService.currentUser);
    console.log(this.userService.status);

    if (this.userService.canActivate()) {
      this.router.navigate(['home']);
    }
  }


}
