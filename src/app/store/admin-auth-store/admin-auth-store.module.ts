import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  adminAuthReducer,
  ADMIN_AUTH_FEATURE_NAME,
} from './store/admin-auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminAuthEffects } from './store/admin-auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminAuthInterceptor } from './interceptors/admin-auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ADMIN_AUTH_FEATURE_NAME, adminAuthReducer),
    EffectsModule.forFeature([AdminAuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminAuthStoreModule {}
