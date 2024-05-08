import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Good } from '../../models/good';

@Component({
  selector: 'app-item-of-goods',
  standalone: true,
  imports: [],
  templateUrl: './item-of-goods.component.html',
  styleUrl: './item-of-goods.component.css'
})
export class ItemOfGoodsComponent {

@Input()
public good:Good|null=null;

@Output()
public onDeleteClick=new EventEmitter();


}
