import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { authInterceptor } from "./auth.interceptor";
import { Provider } from "@angular/core";


export const authInterceptorProvider:Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: authInterceptor,
    multi:true
}