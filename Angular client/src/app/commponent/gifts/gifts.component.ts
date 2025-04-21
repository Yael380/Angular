import { Component, OnInit, ChangeDetectorRef, ViewChildren, inject, computed } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Gift } from '../../models/gifts.model';
import { Donor } from '../../models/donors.model';
import { GiftsService } from '../../service/gifts.service';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs'
import { HttpClientModule } from '@angular/common/http';
import { DuplicateProductValidatorDirective } from '../../shared/validators/duplicate-validator.directive'
import { DonorsService } from '../../service/donors.service';
import { HttpClient } from '@angular/common/http';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
interface ExportColumn {
    title: string;
    dataKey: string;
}
@Component({
    selector: 'app-gifts',
    templateUrl: 'gifts.component.html',
    styleUrl: 'gifts.component.css',
    standalone: true,
    imports: [ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule, HttpClientModule, DuplicateProductValidatorDirective],
    providers: [MessageService, ConfirmationService, DonorsService],
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})

export class GiftsComponent { //implements OnInit{

    
    productDialog: boolean = false;

    products!: Gift[];

    product!: Gift;

    searchValue: string = "";

    selectedProducts!: Gift[] | null;

    submitted: boolean = false;
    position: string = 'center';

    donors: any[] = [];
    donor: any = '';

    nameInput: any;

    flag: boolean = false;
    @ViewChildren('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        //public productService=inject(GiftsService),
        private productService: GiftsService,
        private donorService: DonorsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef,
        private http: HttpClient
    ) { }
    ngOnInit(): void {
        this.loadData()
        this.donorService.getDonorsData().subscribe((data: any) => {
            this.donors = data.map((d: any) => { return { "id": d.id, "name": d.name } });
        }),
            console.log(this.donors);
    }
    exportCSV() {
        this.dt.exportCSV();
    }

    isVisible(product: Gift) {
        return product.winner;
        //return this.productService.isRaffle();
        //return computed(() => this.productService.isRaffle() || product.winner);
    }

    loadData() {
        console.log(this.donors);
        this.productService.getProductsData()
            .subscribe((data: any) => {
                this.products = data;
                this.cd.markForCheck();
            });
        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
        this.product.price = 10;
    }

    editProduct(product: Gift) {
        this.product = { ...product };
        this.productDialog = true;
    }


    deleteSelectedProducts() {
        const arrId: any = this.selectedProducts?.filter(p=>p.users.length==0).map((p: Gift) => Number(p.id))
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProducts(this.selectedProducts).subscribe(() => this.loadData())
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
                this.deleteFromLocalStorage(arrId)
            }
        });

    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Gift) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if(product.users.length == 0){
                    this.productService.deleteProduct(Number(product.id)).subscribe(() => this.loadData())
                    this.product = {};
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Deleted',
                        life: 3000
                    });}
                const arrId: number[] = [Number(product.id)]
                this.deleteFromLocalStorage(arrId)
            }
        });

    }
    onBlur() {
        this.flag = true
    }
    onFocus() {
        this.flag = false
    }


    saveProduct(nameInput: any) {
        this.submitted = true;
        if (this.products.find(p => p.name == this.product.name && p.id != this.product.id) == null) {
            console.log(this.product);
            this.product.donor = this.donor.id
            if (this.product.name?.trim()) {
                if (this.product.id) {
                    this.productService.updateProducts(Number(this.product.id), this.product).subscribe(() => this.loadData())
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Updated',
                        life: 3000
                    });
                } else {
                    this.productService.createProducts(this.product).subscribe((data: Gift) => {
                        this.product = data;
                        this.loadData()
                    })
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Created',
                        life: 3000
                    });
                }
                this.productDialog = false;
                this.product = {};
            }
        }
    }
    getDonorName(id: number) {
        const donor = this.donors?.find(d => d.id === +id);
        return donor ? donor.name : ''; // בדיקה אם donor קיים    
    }

    deleteFromLocalStorage(arrId: number[]) {
        let storedItems = localStorage.getItem('cart');
        let cart: any[] = storedItems ? JSON.parse(storedItems) : [];
        if (cart.length > 0) {
            cart = cart.filter(c => !arrId?.includes(c.id))
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    raffle(product: Gift) {
        if (product.users.length > 0 && product.winner == null) {
            const winner = Math.floor(Math.random() * product.users.length)
            product.winner = product.users[winner];
            console.log(product.winner);
         }
         else if(product.users.length == 0 && product.winner == null)   {
            product.winner={name:'Nan',email:'Nan@Nan',phone:'Nan'}    
         }
         this.productService.updateProducts(Number(product.id), product).subscribe(() => {this.loadData();
            this.deleteFromLocalStorage([Number(product.id)])
        });
    }
    raffleProduct(product: Gift) {
        this.raffle(product)
        this.messageService.add({ severity: "success", summary: 'Raffle Successfully', detail: `The winner is ${product.winner?.name}`});
    }
    raffleProducts() {
        console.log("raffle");
        this.productService.isRaffle.set(true)        
        this.productService.getProductsData().subscribe((data: any) => {
            this.products = data;
            this.products.forEach(product => {
                this.raffle(product);
            })
        })
    }

    confirmRaffle(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: 'Are you sure you want to do raffle?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonStyleClass: 'p-button-text',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                text: true,
            },
            acceptButtonProps: {
                label: 'Yes',
                severity: "contrast",
                text: true,
            },
            accept: () => {
                this.raffleProducts();
                this.messageService.add({ severity: "success", summary: 'Successfully', detail: 'Raffle successfully' });
            },
            key: 'positionDialog',
        });
    }
    onUpload(event: any, product:Gift): void {
        const formData = new FormData();
        for (let file of event.files) {
          formData.append('file', file); // הוספת הקובץ ל-FormData
        }
    
        this.productService.uploadFile(formData).subscribe({
          next: (response) => {
            product.image = response.filePath;
            console.log('Upload successful:', response);
            this.messageService.add({ severity: 'success', summary: 'File Uploaded', detail: 'Your file has been uploaded successfully.' });
          },
          error: (err) => {
            console.error('Upload failed:', err);
            this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'There was an error uploading the file.' });
          }
        });
      }

}




