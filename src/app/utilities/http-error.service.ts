import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {

  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.statusText}`;
    }
    return errorMessage;
  }
}
