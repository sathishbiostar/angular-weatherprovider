import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class WeatherService {
  apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
 apiKey = "958dd77be6bb86cdec58b6aa8ac2d91d";
  constructor(private http: HttpClient) { }
  /*   Headers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return httpOptions;

  } */
  getWeatherDetails(city) {
    let params = new HttpParams()
    .set("q",city)
    .set("appid",this.apiKey)
     return this.http.get(this.apiUrl,{params});
   
  }
}