import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfGoodsComponent } from './item-of-goods.component';

describe('ItemOfGoodsComponent', () => {
  let component: ItemOfGoodsComponent;
  let fixture: ComponentFixture<ItemOfGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOfGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
