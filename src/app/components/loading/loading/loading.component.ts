import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit, OnDestroy {

  code;
  userSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.code = params['code'];
        // console.log(this.code); // Print the parameter to the console.
      }
    );
    this.userSubscription = this.userService.$currentUser.subscribe( (user) => {
        if (this.userService.canActivate()) {
          this.router.navigate(['home']);
        }
    });

  }

  ngOnInit() {
    this.userService.getToken(this.code);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
