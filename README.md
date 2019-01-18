# RmsWebclient

rms-webclient is the Angular front end microservice of the Resource Force application.

The previous iteration implemented Admin functionality, Email services, and Security concepts.

Admin: 
Login
Registration
angular-calendar (calendar module npm)
Edit Events
Reservations pulled from rms-resource-service and rms-reservation-service
Unfortunately tightly coupled due to previous iterations making refactorability difficult.

Email:
Changes to events automatically send email to reservation user
Email sends reminders for specified time.
Login as user and specify "Remind Me" on users new reservations.
Back end functionality in rms-email-service

Security:
Foundational concepts for locking endpoints and assigning user roles.
Implemented in authentication-service.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
