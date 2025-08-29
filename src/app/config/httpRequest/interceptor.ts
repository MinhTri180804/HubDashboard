import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const corsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modifiedReq = req.clone({
    url: req.url.replace('localhost:5001', 'http://localhost:5001'),
    headers: req.headers.set('Access-Control-Allow-Origin', '*'),
  });
  return next(modifiedReq);
};
