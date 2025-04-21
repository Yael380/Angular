import { Component, inject, Output} from '@angular/core';
import { Gift } from '../../models/gifts.model';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { GiftsService } from '../../service/gifts.service';
import { PaymentComponent } from '../payment/payment.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    standalone: true,
    imports: [DataView, ButtonModule, Tag, CommonModule,PaymentComponent,RouterOutlet,CardModule],
    providers: [GiftsService]
})
export class CartComponent {
    products = signal<any>([]);
    totalPrice:Number=0
    giftService=inject(GiftsService);

    storedItems = localStorage.getItem('cart');
    cart:any[] = this.storedItems ? JSON.parse(this.storedItems) : [];

    openPayment:boolean=false
    constructor(private router: Router){}
    ngOnInit() {
      // this.totalPrice=this.products.
      this.totalAmount()
    }
    totalAmount(){
      this.totalPrice=this.cart.reduce((prev,cur)=>{
        return prev+(cur.price*cur.amount);
      },0)
    }
    deleteProductCart(id:number){
      this.cart=this.cart.filter(c=>c.id!=id)
      localStorage.setItem('cart',JSON.stringify(this.cart))
      this.totalAmount()
    }
    toPay(){
      this.openPayment=true;
    }
    closeDialog(){
      this.openPayment=false;
      location.reload()
    }
}