import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movies } from '../_models/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }
  private moviesSource = new BehaviorSubject<Movies[]>([
    { rating: 8.6, title: "Dune" },
    { rating: 8.3, title: "Oppenheimer" },
    { rating: 8.8, title: "Fight Club" }
  ]);
  movies$ = this.moviesSource.asObservable();

  addMovie(movie: Movies) {
    const currentMovies = this.moviesSource.value;
    this.moviesSource.next([...currentMovies, movie]);
  }
}
