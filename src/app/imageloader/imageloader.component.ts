import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-imageloader',
  templateUrl: './imageloader.component.html',
  styleUrls: ['./imageloader.component.css']
})
export class ImageloaderComponent {

  public trailname;
  public firebase;

// Main task
task: AngularFireUploadTask;

// Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

// Download URL
downloadURL: Observable<string>;
url: string;

// State for dropzone CSS toggling
isHovering: boolean;

constructor(private route: ActivatedRoute, private router: Router, private storage: AngularFireStorage, private angularFire: AngularFireDatabase) {
  this.trailname = this.route.snapshot.paramMap.get('name');
  this.firebase = this.angularFire.list('/trailimages');
 }


toggleHover(event: boolean) {
  this.isHovering = event;
}


startUpload(event: FileList) {
  const len = event.length;
  console.log('Uplading ', len, ' files');
  for (var _i = 0; _i < len; _i++) {

      // The File object
      // const file = event.item(0);
      const file = event[_i];
      console.log('starting upload for', file);

      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ')
        return;
      }

      // The storage path
      // const path = `test/${new Date().getTime()}_${file.name}`;

      var path = this.trailname + '/' + file.name;

      // Totally optional metadata
      const customMetadata = { app: 'My AngularFire-powered PWA!' };

      // Get reference to file
      const fileRef = this.storage.ref(path);

      // The main task
      this.task = this.storage.upload(path, file, { customMetadata })

      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot   = this.task.snapshotChanges()

      // The file's download URL
      //  this.downloadURL = this.task.downloadURL(); this does not work any more
      this.task.snapshotChanges()
      .pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        // console.log("URL: " + this.downloadURL);
      })
    )
    .subscribe();
  } // end of for-loop
} //end of startUpload

// Tätä funktiota ei enää käytetä , GPS-positio ja URL talletetaan Firebase-funktioiden avulla
addImage(url: string) {
  this.firebase = this.angularFire.list('/trailimages/' + this.trailname);
  // console.log("talletetaan + " + '/trailimages/' + this.trailname);
  // console.log("url: " + url);
  this.firebase.push({
    imageLat: 0,
    imageLon: 0,
    imageSrc: url
  })
}

uploadDone(){
  this.router.navigate(['/trail/'+this.trailname]);
}


// Determines if the upload task is active
isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
}


}
