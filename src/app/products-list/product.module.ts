import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailComponent],
  imports: [SharedModule, ProductRoutingModule]
})
export class ProductModule {}
