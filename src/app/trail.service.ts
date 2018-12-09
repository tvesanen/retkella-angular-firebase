import { Injectable } from '@angular/core';
import { Trail, TrailImage } from './trail';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class TrailService {
  // private trailsUrl = 'api/trails';
  private trailsUrl = 'http://www.retkella.net/trails.php';


  constructor(private http: HttpClient, private db: AngularFireDatabase) {

   }
   getTrailsFB(): Observable<Trail[]> {
     return this.db.list<Trail>('/trails').valueChanges().pipe(
      catchError(this.handleError('getTrailsFB', []))
    );
   }

   getTrailFB(name:string): Observable<Trail[]> {
     // console.log(name);
     return this.db.list<Trail>(`/trails`,ref => ref.orderByChild("name").equalTo(name).limitToLast(1)).valueChanges().pipe(
      catchError(this.handleError('getTrailFB', []))
    );
   }


   getTrailImages(name:string): Observable<TrailImage[]> {
    // console.log(`/trailimages/${name}`);

    return this.db.list<TrailImage>(`/trailimages/${name}`,ref => ref.orderByChild("imageSrc")).valueChanges().pipe(
      catchError(this.handleError('getTrailImages', [])));
  }


//** Not needed any more as we are reading the trails from Firebase
//   getTrails(): Observable<Trail[]> {
//     return this.http.get<Trail[]>(this.trailsUrl)
//     .pipe(
//      catchError(this.handleError('getTrails', []))
//    );
//   }

   /** GET hero by id. Will 404 if id not found */
   // getTrail(id: number): Observable<Trail> {
     // const url = `${this.trailsUrl}/${id}`;
  //   const url = `${this.trailsUrl}?id=${id}`;  // using php server
  //   console.log(url);
  //   return this.http.get<Trail>(url).pipe(
  //     catchError(this.handleError<Trail>(`getTrail id=${id}`))
  //   );
  // }


   /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
   private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption


       // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }
}
