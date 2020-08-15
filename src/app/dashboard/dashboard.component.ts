import { Component,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  ValidatorFn} from '@angular/forms';
  import { Subscription, Observable, timer  } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
selector: "dashboard",
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  @ViewChild('getHeight') elementView: ElementRef;
private subscription: Subscription;
  everySecond: Observable<number> = timer(0, 30000);
weatherInputForm: FormGroup;
submitted = false;
count = 0;
allCityNames = [];
getOfflineArray :any;
enableEditClick = false;
invalidCity = false;
public setHeight;
 cityName: any = [
  {id:"1",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"2",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"3",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"4",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"5",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"6",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"7",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"8",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }},
  {id:"9",enableedit:false,enableinput:false,getWeatherResult : {
  weather:[{
    icon:""
  }]  }}
] 
public getWeatherResult: any = {
  weather:[{
    icon:""
  }]  };

public enteredCity : string = "";
  constructor(private formBuilder: FormBuilder,private http:WeatherService) {
     this.weatherInputForm = this.formBuilder.group({
           cityName: ['']
        });
   }
    ngOnInit() {
      
        this.getOfflineArray = JSON.parse(localStorage.getItem("resultArray"));
        if(this.getOfflineArray !="undefined" && this.getOfflineArray !=null){
          this.cityName = [];
          this.cityName = this.getOfflineArray;
           this.subscription = this.everySecond.subscribe((seconds) => {
        for(let i=0;i<this.cityName.length;i++){
          if(this.cityName[i].enteredCity && this.cityName[i].enteredCity !="" && this.cityName[i].enteredCity != undefined && this.cityName[i].enteredCity !=null){
          this.http.getWeatherDetails(this.cityName[i].enteredCity).subscribe((result) => {
            if(this.cityName[i].enableinput== true){
              this.cityName[i].getWeatherResult = result;
          this.cityName[i].enableedit = true;
          this.cityName[i].enableinput= false;
          this.cityName[i].enableEditClick = true;
           
         /*  setTimeout(()=>{
            this.setHeight = this.elementView.nativeElement.offsetHeight;
          },300); */
            }
          
                });
          }
          
             }
      });
         // this.onSubmit(this.cityName[0].enteredCity,0)
           setTimeout(()=>{
           this.setHeight = this.elementView.nativeElement.offsetHeight;
          },2000);
        
        }
    }
    onSubmit(value,i) {
         this.http.getWeatherDetails(value).subscribe((result) => {
          
          this.cityName[i].getWeatherResult = result;
          this.cityName[i].enableedit = true;
          this.cityName[i].enableinput= false;
          this.cityName[i].enableEditClick = true;
          this.cityName[i].invalidCity = false;
            setTimeout(()=>{
            this.setHeight = this.elementView.nativeElement.offsetHeight;
          },1000);
          
          localStorage.setItem("resultArray",JSON.stringify(this.cityName));
         
      this.count = this.count+1;
      var customObj = {
        value:value,
        uniqueId:this.count
      };
      this.allCityNames.push(customObj);
     
          /* setInterval(()=>{
             for(let j=0;j<this.allCityNames.length;j++){
          this.http.getWeatherDetails(this.allCityNames[i].value).subscribe((result) => {
            if(this.cityName[i].enableinput== true){
              this.cityName[i].getWeatherResult = result;
          this.cityName[i].enableedit = true;
          this.cityName[i].enableinput= false;
          this.cityName[i].enableEditClick = true;
           
          setTimeout(()=>{
            this.setHeight = this.elementView.nativeElement.offsetHeight;
          },300);
            }
          
                });
             }
            
          },10000); */
         },
        (error) => {     
          this.cityName[i].error = error;
          if(this.cityName[i].error.error.cod == 400 || this.cityName[i].error.error.cod == 404){
              this.cityName[i].invalidCity = true;
              this.cityName[i].enteredCity = "";
           }
        })
    }
editEvent(data,i){
           this.cityName[i].enableedit = false;
          this.cityName[i].enableinput= true;
          this.cityName[i].enableEditClick = false;
           this.cityName[i].enteredCity = "";
}
  
}