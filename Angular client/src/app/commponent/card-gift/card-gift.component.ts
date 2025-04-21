import { Component, computed } from '@angular/core';
import { Gift } from '../../models/gifts.model';
import { GiftsService } from '../../service/gifts.service';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-card-gift',
    templateUrl: './card-gift.component.html',
    styleUrl: './card-gift.component.css',
    standalone: true,
    imports: [
        DataView,
        Tag,
        InputNumberModule,
        Rating,
        ButtonModule,
        CommonModule,
        SelectButton,
        FormsModule,
        ToastModule,
        InputNumber
    ],
    providers: [MessageService],
})
export class CardGiftComponent {
    layout: 'list' | 'grid' = 'grid';

    storedItems = localStorage.getItem('cart');

    cart: any[] = this.storedItems ? JSON.parse(this.storedItems) : [];

    products = signal<any>([]);

    amount: number = 1;

    constructor(public productService: GiftsService,private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProductsData().subscribe((data) => {
            this.products.set(data)//[...data.slice(0,12)]);
            console.log("amount  " + this.amount)
        });
        console.log(this.productService.isRaffle());
    }

    addTickets(amount: any, product: Gift) {
        const cartId = this.cart?.find(c => c.id === product.id);
        if (cartId) {
            cartId.amount += amount;
        } else {
            this.cart.push({ id: product.id, image: product.image, name: product.name, price: product.price, amount });
        }
        console.log(this.cart);
        localStorage.setItem('cart', JSON.stringify(this.cart))
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tickets have been added to your cart.',
            life: 3000
        });
    }


}