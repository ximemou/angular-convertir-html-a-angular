import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductDescription } from '../../interfaces/product-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product: ProductDescription;
  productId: string;

  constructor( private route: ActivatedRoute, public productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params
        .subscribe(parameters => {
          console.log(parameters);
          // tslint:disable-next-line: no-string-literal
          this.productService.getProduct(parameters['id'])
              .subscribe((product: ProductDescription) => {
                this.productId = parameters['id'];
                console.log(product);
                this.product = product;
              });
        });
  }

}
