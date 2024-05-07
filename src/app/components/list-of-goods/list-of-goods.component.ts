import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { Good } from '../../models/good';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-of-goods',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorComponent],
  templateUrl: './list-of-goods.component.html',
  styleUrl: './list-of-goods.component.css'
})
export class ListOfGoodsComponent {
  public goods:Good[]=[];

  public isLoading=false;
  public isError=false;
  
  
  
  public constructor(private goodsService:GoodsService, private authService:AuthService){
    //this.goods=goodsService.goods;
    this.loadData();
  
    //this.authService.register("eta@eta.lt", "labasrytas", false);
  }

  private loadData(){
    let x=this.goodsService.loadData();

    let obs=this.goodsService.loadData();
    
    //Kai turime tik vieną f-ją kurią norime kad iškviestų po duomenų gavimo
    /*
    obs.subscribe( (data)=>{
      console.log("duomenys gauti paprastai")
    });

    obs.subscribe({
      next:(data)=>{
        console.log("duomenys gauti is next")
      },
      error:(err)=>{
        console.log("Ivyko klaida")
      },
      complete:()=>{
        console.log("Observable baige darba");
      }

    });
*/


  
    this.isLoading=true;
    this.isError=false;
    obs.subscribe({
      next:(data)=>{
        this.goods=data;
        this.isLoading=false;
        this.isError=false;
      },
      error:(error)=>{
        this.isError=true;
        this.isLoading=false;
      }
      
    });
  }


  public deleteRecord(id:string|null){
    if (id!=null){
      this.isLoading=true;
      this.goodsService.deleteRecord(id).subscribe(()=>{
        
        this.loadData();
        

      });
    }
  }

  public closeError(){
    this.loadData();
  }
}