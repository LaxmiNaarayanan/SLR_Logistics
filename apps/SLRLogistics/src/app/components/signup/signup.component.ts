import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormErrorsComponent } from '../form-errors.component';
import { API_RESPONSE } from '../../constants';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbTooltipModule,
    FormErrorsComponent,
  ],
  providers: [UserService],
})
export class SignupComponent implements OnDestroy {
  @ViewChild('dangerTpl', { static: true })
  dangerTemplate!: TemplateRef<unknown>;

  signupForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  toastService = inject(ToastService);
  toastMessage = '';

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  async handleSignup() {
    const { username, password } = this.signupForm.value;
    if (username && password) {
      try {
        const user = await this.userService.createUser(username, password);
        if (user) {
          this.toastMessage = API_RESPONSE[201];
          this.toastService.show({
            template: this.dangerTemplate,
            className: 'bg-danger text-light',
          });
          this.router.navigateByUrl('/');
        }
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse) {
          this.toastMessage = API_RESPONSE[error.status]
          this.toastService.show({
            template: this.dangerTemplate,
            className: 'bg-danger text-light',
          });
          return;
        }

        this.toastMessage = 'Some error occurred from our end';
        this.toastService.show({
          template: this.dangerTemplate,
          className: 'bg-danger text-light',
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
