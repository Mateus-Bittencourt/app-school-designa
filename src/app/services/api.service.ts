import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public get<T>(path: string): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.get<T>(`${environment.apiUrl}${path}`, this.getOptions())
    );
  }

  public post<T>(path: string, body: object = {}): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.post<T>(
        `${environment.apiUrl}${path}`,
        body,
        this.getOptions()
      )
    );
  }

  public delete<T>(path: string): Promise<T> {
    return this.parseRequest<T>(
      this.httpClient.delete<T>(
        `${environment.apiUrl}${path}`,
        this.getOptions()
      )
    );
  }

  private async parseRequest<T>(request: Observable<T>): Promise<T> {
    return lastValueFrom(request)
      .then((success: T) => success)
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }

  private getOptions(): object {
    const headers = {
      'Content-Type': 'application/json',
      'X-User-Email': '',
      'X-User-Token': '',
    };

    if (this.authService.isLoggedIn()) {
      headers['X-User-Email'] = this.authService.currentUser.email;
      headers['X-User-Token'] = this.authService.currentUser.authentication_token;
    }

    return {
      headers,
    };
  }
}
