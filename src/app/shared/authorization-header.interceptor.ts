import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./services/user.service";

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
    constructor(private _userService: UserService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | undefined = this._userService.getUser()?.token;
        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', this._userService.getUser().token)
            });
            return next.handle(authReq)
        }
        return next.handle(req);
    }
}

