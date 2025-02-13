import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public cartItemCount: number = 0;
  public cartTotal: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  public goToCart() {
    this.router.navigate(['/cart']);
  }

}