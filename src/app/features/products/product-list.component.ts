import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public displayedProducts: Product[] = [];
  public currentPage = 1;
  public pageSize = 8;
  public totalPages = 0;
  public isLoading = false;
  public hasError = false;
  public errorMessage = 'Failed to load products. Please try again.';

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.isLoading = true;
    this.hasError = false;

    this.productService.getProducts().pipe(
      catchError((error) => {
        console.error('Product loading failed:', error);
        this.hasError = true;
        this.isLoading = false;
        this.cdRef.markForCheck();
        return of([]);
      })
    ).subscribe((data: Product[]) => {
      this.products = data;
      this.calculateTotalPages();
      this.updateDisplayedProducts();
      this.isLoading = false;
      this.cdRef.markForCheck();
    });
  }

  public calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
  }

  public trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  public updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
    this.cdRef.markForCheck();
  }

  public addToCart(product: Product, quantity: number) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity || 1
    };
    this.cartService.addToCart(cartItem);
    product.quantity = 1;
    alert(`Success! ${product.name} (x${quantity}) has been added to your cart.`);
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  public retryLoading(): void {
    this.loadProducts();
  }
}
