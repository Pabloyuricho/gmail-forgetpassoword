import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrlMember: any = 'https://lms-portal-backend-vixs.onrender.com/members';
  
  constructor(public Http: HttpClient) { }

  saveNewMember(formData: any) {
    return this.Http.post(this.apiUrlMember, formData);
  }

  getMembersList() {
    return this.Http.get(this.apiUrlMember);
  }
}