import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import IProduct from './product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  title: string = 'Product list';
  displayedColumns: string[] = [
    'imageUrl',
    'productName',
    'productCode',
    'releaseDate',
    'price',
    'starRating'
  ];
  products: IProduct[];
  dataSource: MatTableDataSource<IProduct>;
  showImage: boolean = false;
  errorMessage: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => (this.errorMessage = <any>error)
    );
  }

  toggleImg(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    console.log(message);
    this.title += message;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
