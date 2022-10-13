import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private products : any[] = [

    { id: 1, name: "iphone 14", price: 20000, imageUrl: "1.jpeg", description: "iyi telefon", isActive: true },
    { id: 2, name: "iphone 15", price: 30000, imageUrl: "2.jpeg", description: "iyi telefon", isActive: true },
    { id: 3, name: "iphone 16", price: 40000, imageUrl: "3.jpeg", description: "iyi telefon", isActive: true }   
  ];

  getProducts() {
    return this.products.filter(p=>p.isActive);
  }

}
