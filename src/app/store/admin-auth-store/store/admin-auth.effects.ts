import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailed, loginSuccess } from './admin-auth.actions';
import { catchError, delay, delayWhen, filter, first, map, switchMap } from 'rxjs/operators';
import { AdminAuthService } from '../services/admin-auth.service';
import { of, timer } from 'rxjs';
import { AuthData } from './admin-auth.reducer';
import { select, Store } from '@ngrx/store';
import { isAuth } from './admin-auth.selectors';

@Injectable()
export class AdminAuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.adminAuthService
          .login({
            login: action.login,
            password: action.password,
          })
          .pipe(
            map((loginSuccessData) =>
              loginSuccess({ authData: loginSuccessData })
            ),
            catchError((error) =>
              of(
                loginFailed({
                  serverError: error.message,
                })
              )
            )
          )
      )
    )
  );

  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    delay(14 * 60 * 1000),
    switchMap(()=> this.store$.pipe(select(isAuth),
    first(),
    filter(isAdminAuth => isAdminAuth))),
    switchMap(() => this.adminAuthService.refresh() .pipe(
      map((loginSuccessData) =>
        loginSuccess({ authData: loginSuccessData })
      ),
    ))
  ));
  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService,
    private store$: Store
  ) {}
}
