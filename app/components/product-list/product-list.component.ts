import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products!: Product[];
  curentCategoryId!: any;

  constructor(private productService: ProductService,private route:ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.subscribe(()=>{
        this.listProducts();
      });
      
  }

  listProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.curentCategoryId = this.route.snapshot.paramMap.get(`id`);
    }
    else{
      this.curentCategoryId = 1 ;
    }

    this.productService.getProductList(this.curentCategoryId).subscribe(
        data => {
          this.products = data;
        }
    )
  }

}
