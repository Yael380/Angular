import { Component, inject, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GiftsService } from '../../service/gifts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, CommonModule],
  providers: [GiftsService]
})
export class PaymentComponent {
  visible: boolean = false;

  closeDialog = output();

  giftsService = inject(GiftsService);
  user: any = { name: '', phone: '', email: '' }

  payment = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  ngOnInit() {
    this.visible = true;
  }
  saveOrder() {   
    if (this.user.name && this.user.email && this.user.email.includes('@')) { 
      const giftCart = localStorage.getItem('cart');
      let cart = giftCart ? JSON.parse(giftCart) : [];
      let GiftCart = cart?.map((c: any) => { return { id: c.id, amount: c.amount } })
      console.log(GiftCart, this.user);
      this.giftsService.closeOrder(GiftCart, this.user).subscribe(() => {localStorage.removeItem('cart')
        this.closeDialogPayment()});
    }
  }
  closeDialogPayment() {
    this.closeDialog.emit()
  }
}