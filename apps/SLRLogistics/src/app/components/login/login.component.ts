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
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbTooltipModule,
    FormErrorsComponent
  ],
  providers: [UserService],
})
export class LoginComponent implements OnDestroy {
  @ViewChild('dangerTpl', { static: true })
  dangerTemplate!: TemplateRef<unknown>;

  loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  toastService = inject(ToastService);

  toastMessage = '';

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  async handleLogin() {
    this.loginForm.markAllAsTouched();
    const { username, password } = this.loginForm.value;
    if (username && password) {
      try {
        const user = await this.userService.loginUser(username, password);
        if (user) {
          this.toastMessage = 'Successfully logged in!'
          this.toastService.show({
            template: this.dangerTemplate,
            className: 'bg-success text-light',
          });
          this.router.navigateByUrl('/');
        }
      } catch (error: any) {
        this.loginForm.reset();
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
