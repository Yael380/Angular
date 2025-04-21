import { Component, OnInit, ChangeDetectorRef, ViewChildren, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../models/donors.model'
import { DonorsService } from '../../service/donors.service';
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
import { HttpClientModule } from '@angular/common/http';
// import { DuplicateDonorValidatorDirective } from '../../shared/validators/duplicate-validator.directive'

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
    selector: 'app-donors',
    templateUrl: 'donors.component.html',
    styleUrl: 'donors.component.css',
    standalone: true,
    imports: [ButtonModule, TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule, HttpClientModule,],
    providers: [MessageService, ConfirmationService, DonorsService],
    styles: [
        `:host ::ng-deep .p-dialog .donor-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class DonorsComponent { //implements OnInit{
    donorDialog: boolean = false;

    donors!: Donor[];

    donor!: Donor;

    searchValue: string = "";

    selectedDonors!: Donor[] | null;

    submitted: boolean = false;

    email: any|null;

    @ViewChildren('dt') dt!: Table;

    cols!: Column[];

    exportColumns!: ExportColumn[];

    constructor(
        private donorService: DonorsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef,
    ) { }
    ngOnInit(): void {
        this.loadData()
    }
    exportCSV() {
        this.dt.exportCSV();
    }

    loadData() {
        this.donorService.getDonorsData()
            .subscribe((data: any) => {
                this.donors = data;
                this.cd.markForCheck();
            });

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Donor Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
                    this.email=this.donorService.updateDonors(Number(this.donor.id), this.donor).subscribe(() => this.loadData())
                    if(this.email!=null)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Donor Updated',
                        life: 3000
                    });
                } else {
                    this.email=this.donorService.createDonors(this.donor).subscribe((data: Donor) => {
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
    
 }
