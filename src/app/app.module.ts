import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { TrailsComponent } from './trails/trails.component';
import { AppRoutingModule } from './/app-routing.module';
import { TrailDetailComponent } from './trail-detail/trail-detail.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NewTrailComponent } from './new-trail/new-trail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ImageloaderComponent } from './imageloader/imageloader.component';


// import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHZtjXfvGjIWInSA8xcjLmQsXRq5h8sD4'
    }),
    AppRoutingModule,
    HttpClientModule

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    // InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [AuthGuard],
  declarations: [ AppComponent, TrailsComponent, TrailDetailComponent, NewTrailComponent, LoginComponent, ImageloaderComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
