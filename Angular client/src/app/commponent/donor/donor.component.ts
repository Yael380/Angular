
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Gift } from '../../models/gifts.model';
import { Tag } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GiftsService } from '../../service/gifts.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DonorsService } from '../../service/donors.service';
import { Donor } from '../../models/donors.model';
import { ChangeDetectorRef, ViewChildren, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css',
  imports: [TableModule, Tag, ToastModule,ConfirmDialog, Rating, ButtonModule, CommonModule,ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule, HttpClientModule],
  providers: [GiftsService, MessageService,DonorsService,ConfirmationService]
})
export class DonorComponent implements OnInit{

    products!: Gift[];
    donors!: Donor[];
    expandedRows = {};
    donorDialog: boolean = false;

    donor!: Donor;
    
    searchValue: string = "";
    
    selectedDonors!: Donor[] | null;
    
    submitted: boolean = false;
    
    email: any|null;
    
    constructor(private productService: GiftsService, private messageService: MessageService, private donorsService: DonorsService,private confirmationService: ConfirmationService,) {}

    ngOnInit() {
        this.productService.getProductsData().subscribe((data:any) => {this.products = data});
        this.donorsService.getDonorsData().subscribe((data:any) => {this.donors = data});
    }
    loadData() {
      this.donorsService.getDonorsData()
          .subscribe((data: any) => {
              this.donors = data;
          });
        }
    expandAll() {
        this.expandedRows = this.donors.reduce((acc:any, p:any) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }
    filterDonor(donor:Donor){
       const prod=this.products.filter(p=>p.donor==donor.id)
       return prod;
    }
    openNew() {
      this.donor = {};
      this.submitted = false;
      this.donorDialog = true;
  }
  editDonor(donor: Donor) {
      this.donor = { ...donor };
      this.donorDialog = true;
  }


  hideDialog() {
      this.donorDialog = false;
      this.submitted = false;
  }
  saveDonor() {
      this.submitted = true;
          if (this.donor.name?.trim() && this.isValidEmail(this.donor.email)) {
              if (this.donor.email?.trim()) {
              if (this.donor.id) {
                  this.email=this.donorsService.updateDonors(Number(this.donor.id), this.donor).subscribe(() => {
                     this.loadData()}
                )
                  if(this.email!=null)
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Donor Updated',
                      life: 3000
                  });
              } else {
                  this.email=this.donorsService.createDonors(this.donor).subscribe((data: Donor) => {
                      this.donor = data;
                       this.loadData()
                  })
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Donor Created',
                      life: 3000
                  });
              }
              this.donorDialog = false;
              this.donor = {};
           }
      }
}
  isValidEmail(email: string|undefined): boolean|null {
      if(email==null)
          return null; 
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  
  }
  deleteDonor(donor: Donor) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + donor.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            if(this.filterDonor(donor).length==0){
                this.donorsService.deleteDonor(Number(donor.id)).subscribe(() => this.loadData())
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: `Donor ${donor.name} Deleted`,
                    life: 3000
                });}
                else{
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Donor ${donor.name} have gifts`,
                    life: 3000
                })
                }
            // const arrId: number[] = [Number(product.id)]
            // this.deleteFromLocalStorage(arrId)
        }
    });

}
}
