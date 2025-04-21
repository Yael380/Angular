import { Routes } from '@angular/router';
import { GiftsComponent } from './commponent/gifts/gifts.component';
import { DonorsComponent } from './commponent/donors/donors.component';
import { CardGiftComponent } from './commponent/card-gift/card-gift.component';
import { CartComponent } from './commponent/cart/cart.component';
import { PaymentComponent } from './commponent/payment/payment.component';
import { WinnersComponent } from './commponent/winners/winners.component';
import { ManagerService } from './service/manager.service';
import { HomeComponent } from './commponent/home/home.component';
import { DonorComponent } from './commponent/donor/donor.component';

export const routes: Routes = [
    {path: '',component:HomeComponent,},
    {path: 'manageGift',component:GiftsComponent,canActivate:[ManagerService]},
    // {path: 'manageDonor',component:DonorsComponent,canActivate:[ManagerService]},
    {path: 'cardGift',component:CardGiftComponent},
    {path: 'cart',component:CartComponent,children:[{path:'payment',component:PaymentComponent}]},
    {path: 'winners',component:WinnersComponent},
    {path: 'donor',component:DonorComponent},

];
