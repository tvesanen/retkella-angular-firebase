import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrailsComponent }      from './trails/trails.component';
import { TrailDetailComponent }  from './trail-detail/trail-detail.component';
import { NewTrailComponent }  from './new-trail/new-trail.component';
import { LoginComponent }  from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ImageloaderComponent } from './imageloader/imageloader.component';

const routes: Routes = [
  { path: 'trails', component: TrailsComponent },
  { path: 'trail/:name', component: TrailDetailComponent },
  { path: 'new', component: NewTrailComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/:invalidLoginMessage', component: LoginComponent },
  { path: 'load', component: ImageloaderComponent },
  { path: 'load/:name', component: ImageloaderComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
