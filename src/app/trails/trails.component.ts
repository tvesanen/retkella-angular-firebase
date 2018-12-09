import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Position } from '../position';
import { Trail, TrailImage } from '../trail';
import { TrailService } from '../trail.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-trails',
  templateUrl: './trails.component.html',
  styleUrls: ['./trails.component.css']
})
export class TrailsComponent implements OnInit {

  public firebase;

  constructor(private trailService: TrailService, private angularFire: AngularFireDatabase) {
    this.firebase = this.angularFire.list('/trails');
    // console.log(angularFire);
   }


  //lisätty
  marker_positions: Trail[];
  //lisäys loppui
  marker_icon = '/assets/marker_icon.png';
  latcenter: number = 61.5784;
  lngcenter: number = 24.119066;

  getTrails(): void {
    this.trailService.getTrailsFB()
      .subscribe(marker_positions => this.marker_positions = marker_positions);

  }

  storeAll(){
    this.storeMarkers(this.marker_positions);
  }

  storeItem (item) {
    this.firebase.push({
      name: item.name,
      latitude: item.lat,
      longitude: item.lon
    })
  }

  storeMarkers (values) {
    values.forEach (item => {
      this.storeItem(item);
    });


  }

  onMouseOver(infoWindow, gm) {

          if (gm.lastOpen != null) {
              gm.lastOpen.close();
          }

          gm.lastOpen = infoWindow;

          infoWindow.open();
  }


  ngOnInit() {
    this.getTrails();
  }

}
