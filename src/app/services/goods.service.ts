import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Good } from '../models/good';
import { catchError, delay, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

public goods:Good[]=[];

public onGoodsCountChange=new EventEmitter();
public onStatusChange=new EventEmitter<Number>();

  constructor(private http:HttpClient, private authService: AuthService) { }


  public addGood(item:Good){
    this.goods.push(item);
   return  this.http.post("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/goods.json?auth="+this.authService.auth?.idToken,item).pipe(
    tap(()=>this.onGoodsCountChange.emit())
   );
  }

  public loadData(){
    // Gauname observable
    return this.http
     .get<{[key:string]:Good}>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/goods.json?auth="+this.authService.auth?.idToken)
      .pipe( 
          map( (data):Good[]=>{
            let goods=[];
            for (let x in data){
              goods.push({...data[x], id:x });
            }
            this.goods=goods;
          this.onGoodsCountChange.emit(0);
            return goods;
          } ))
          .pipe(
            catchError((er, c)=>{
              this.onStatusChange.emit(1);
              throw "Klaida";
            })
          )
          
          /*
      .pipe(
          tap((data)=>{
      
            console.log("Duomenys is tap");
            this.goods=data;
          })
        )
        */
      //.pipe(
     //   delay(1000)
     // ) 
      ;
  }




public loadRecord(id:String){
  return this.http.get<Good>("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/goods"+id+".json?auth="+this.authService.auth?.idToken);

}

public updateRecord(item:Good){
  return this.http.patch("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/goods"+item.id+".json?auth="+this.authService.auth?.idToken,item);
}


public deleteRecord(id:string){
  return this.http.delete("https://kaledos-71115-default-rtdb.europe-west1.firebasedatabase.app/goods"+id+".json?auth="+this.authService.auth?.idToken).pipe(
    tap(()=>this.onGoodsCountChange.emit())
);
}
}


