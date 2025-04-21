import { Component, computed, inject, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ManagerService } from '../../service/manager.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule,ToastModule],
  providers:[MessageService]
})
export class ManagerComponent {
  
  visible: boolean = false;

  password: string = '';

  position: any = "topright";

  managerService = inject(ManagerService)

  constructor(private messageService: MessageService) {}

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }
  saveManager() {
    if(this.password){
    this.managerService.CheckManager(this.password).subscribe((isManager: boolean) => {
      if (isManager) {
        this.managerService.setManager(isManager)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'You are logged in as administrator.',
          life: 3000
      });
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You are not a manager.',
          life: 3000,
      });
      }
    })}
    this.visible = false;
  }
  logOut(){
    this.managerService.setManager(false);
    this.messageService.add({
      severity: 'secondary',
      summary: 'Log out',
      detail: 'You are logged out as administrator.',
      life: 3000,
  });
  }
  IsManager(){ 
     return this.managerService.getManager().value
  }
}

