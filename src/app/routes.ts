/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { SignupComponent } from './signup/signup.component';
 import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent},
   // { path: 'signup', component: SignupComponent},
];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
