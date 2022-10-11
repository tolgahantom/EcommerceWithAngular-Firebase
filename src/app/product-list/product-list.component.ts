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

  product = {
    id: 1,
    name: "iphone 15",
    price: 20000,
    imageUrl: "1.jpeg",
    description: "iyi telefon",
    isActive: true
  }

}
