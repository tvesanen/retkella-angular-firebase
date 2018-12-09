import { Component, OnInit, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Trail, TrailImage } from '../trail';
import { Position } from '../position';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TrailService }  from '../trail.service';



@Component({
  selector: 'app-trail-detail',
  templateUrl: './trail-detail.component.html',
  styleUrls: ['./trail-detail.component.css']
})

export class TrailDetailComponent implements OnInit {
  @Input() trail_details: Trail[];


  trail_images: TrailImage[];
  image_positions: Position[];
  latcenter: number;
  lngcenter: number;
  currentImage;
  imageSelected: boolean;

  constructor(private route: ActivatedRoute,
  private trailService: TrailService,
  private location: Location
){  }

  ngOnInit(): void {
    this.imageSelected = false;
    this.getTrail();
  }

  getTrail(): void {
    var name = this.route.snapshot.paramMap.get('name');
    this.trailService.getTrailFB(name).subscribe(trail_details => {
      this.trail_details = trail_details;
      // console.log('Trail details: ', trail_details);

      this.latcenter = this.trail_details[0].latitude;
      this.lngcenter = this.trail_details[0].longitude;
    });

    this.trailService.getTrailImages(name).subscribe(trail_images => {
      this.trail_images = trail_images;
      // this.latcenter = this.trail_images[0].imageLat;
      // this.lngcenter = this.trail_images[0].imageLon;
    });
  }

  showImage(i) {
    // console.log('marker clicked, index: ', i);
    this.currentImage = this.trail_images[i].imageSrc;
    this.imageSelected = true;
  }
}
