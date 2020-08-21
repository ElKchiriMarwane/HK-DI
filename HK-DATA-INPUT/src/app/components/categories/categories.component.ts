import { Observable } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
categories = [];
  constructor(private router: Router, private afs: DatabaseService) { }

  ngOnInit(): void {
   this.afs.getCategories().subscribe(res => {
     this.categories = res;
   });
  }

  goToCategory(id){
    console.log(id)
    this.router.navigate(['/category', id]);
  }

}
