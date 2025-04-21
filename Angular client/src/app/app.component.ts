import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiftsComponent } from './commponent/gifts/gifts.component';
import { LayoutComponent } from './common/layout/layout.component';
import { CardGiftComponent } from './commponent/card-gift/card-gift.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,GiftsComponent,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CheniseSale';
}

