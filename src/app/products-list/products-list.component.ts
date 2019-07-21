import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from './product.service';
import IProduct from './product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  title = 'Product list';
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
  showImage = false;
  errorMessage: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => (this.errorMessage = error as any)
    );
  }

  toggleImg(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
