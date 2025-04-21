import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { GiftsService } from '../../service/gifts.service';
import { Gift } from '../../models/gifts.model';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-winners',
  imports: [ConfirmDialog, ButtonModule, ToastModule, HttpClientModule,TableModule,CommonModule],
  providers: [ConfirmationService, MessageService, GiftsService],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.css'
})
export class WinnersComponent {
  products: Gift[] = [];
  visible:boolean=false;
  constructor(private productService: GiftsService) { }
  ngOnInit() {
    this.productService.getProductsData().subscribe((data: any) => {
      this.products = data;})
  }

}
