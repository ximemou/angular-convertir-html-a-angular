import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: ProductInterface[] = [];
  productsFiltered: ProductInterface [] = [];

  constructor(private http: HttpClient) { 
    this.loadProducts();
  }

  private loadProducts() {


    return new Promise((resolve, reject) => {
      this.http.get('https://angular-udemy-html.firebaseio.com/productos_idx.json')
          .subscribe((resp: ProductInterface[]) => {
            this.products = resp;
            this.loading = false;
            resolve();
    });
    });
  }

  getProduct(id: string){
    return this.http.get(`https://angular-udemy-html.firebaseio.com/productos/${id}.json`);
  }

  searchProducts( term: string){
    if (this.products.length === 0) {
      // load products
      this.loadProducts().then(() => {
        // after getting the products
        this.filterProducts(term);
      })
    } else{
      // apply filter
      this.filterProducts(term);
    }
  }

  private filterProducts(term: string) {
    console.log(this.products);
    this.productsFiltered = [];
    term = term.toLocaleLowerCase();
    this.products.forEach(product => {
      const lowerTitle = product.titulo.toLocaleLowerCase();
      if (product.categoria.indexOf(term) >= 0 || lowerTitle.indexOf(term))  {
        this.productsFiltered.push(product);
      }
    });
  }
}

