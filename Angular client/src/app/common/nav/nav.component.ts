import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ManagerComponent } from '../../commponent/manager/manager.component';
import { ManagerService } from '../../service/manager.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    standalone: true,
    imports: [Menubar, ManagerComponent]
})
export class NavComponent implements OnInit {
    items: MenuItem[] | undefined = []
    managerService = inject(ManagerService)
    ngOnInit() {
        this.setItems()
    }
    setItems() {
        this.items = [{
            label: 'Home',
            icon: 'pi pi-home',
            url: ''
        },
        {
            label: 'Tickets',
            icon: 'pi pi-ticket',
            url: 'cardGift'
        },
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            url: 'cart'
        },
        {
            label: 'Winners',
            icon: 'pi pi-trophy',
            url: 'winners'
        }]
        this.managerService.getManager().subscribe((isManager) => {
            if (isManager) {
                this.items = [
                    ...this.items!,
                    {
                        label: 'Gifts',
                        icon: 'pi pi-gift',
                        url: '/manageGift'
                    },
                    {
                        label: 'Donors',
                        icon: 'pi pi-users',
                        url: '/donor'
                    },
                ]
            }
            else if (this.items?.length==6){
                this.items?.pop()
                this.items?.pop()
                this.items = [...this.items]
            }
        }
        )

    }
}

