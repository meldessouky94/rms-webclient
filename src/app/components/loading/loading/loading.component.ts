import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

/**
 * A component that informs the user about the state of the application.
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass'],
})
export class LoadingComponent implements OnInit, OnDestroy {

  code;
  userSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public router: Router) {
    this.activatedRoute.queryParams.subscribe( (params) => {
        this.code = params['code'];
      },
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
