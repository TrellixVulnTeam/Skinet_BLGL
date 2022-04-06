
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from "./../shared/models/brand";
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number = 0;
  typeIdSelected: number = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe({
      next: response => {
        // console.log('getproducts type: ', typeof response);

        this.products = response.data;
        // console.log(this.products);

      },
      error: error => {
        console.log(error)
      }
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => {
        // console.log('getbrands type: ', typeof response);

        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onBrandSelected(brandId: number) {
    console.log('brandId: ', brandId);

    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    console.log('typeId: ', typeId);
    this.typeIdSelected = typeId;
    this.getProducts();

  }

}
