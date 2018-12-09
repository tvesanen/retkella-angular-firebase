import { Component, OnInit } from '@angular/core';
import { Trail, TrailImage } from '../trail';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trail',
  templateUrl: './new-trail.component.html',
  styleUrls: ['./new-trail.component.css']
})
export class NewTrailComponent implements OnInit {

  public firebase;
  public trailname;
  lat: string;
  lon: string;


  trail: Trail = {
    id: "0",
    name: "",
    latitude: 61.5784,
    longitude: 24.119066
  }

  constructor(private router:Router, private angularFire: AngularFireDatabase) {
    this.trailname = null;
    this.firebase = this.angularFire.list('/trails');
  }

  ngOnInit() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.trail.latitude = position.coords.latitude;
        this.trail.longitude = position.coords.longitude;
      });
    } else {
    console.log("Navigator does not support geolocation, using default location");
    }


    this.lat = ""+(this.trail.latitude); //convert to string
    this.lon = ""+(this.trail.longitude); // convert to string

  }

  placeMarker($event){
    // move marker to clicked location and set it map center
    this.trail.latitude = $event.coords.lat;
    this.trail.longitude = $event.coords.lng;
    this.lat = ""+(this.trail.latitude); //convert to string
    this.lon = ""+(this.trail.longitude); // convert to string
  }

  addTrail() {
    this.trailname = this.trail.name;

    if (this.trailname != "") {
      this.firebase.push({
        name: this.trailname,
        latitude: parseFloat(this.lat),  // store as float
        longitude: parseFloat(this.lon)  // store as float
      })
      this.router.navigate(['/load/'+this.trailname]);
    }
    else {
      alert ('Anna retkikohteen nimi');
    }
  }
}
