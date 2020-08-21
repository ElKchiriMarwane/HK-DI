import { StorageService } from './../../services/storage.service';
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
  constructor(private router: Router, private afs: DatabaseService, public as: StorageService) { }

  ngOnInit(): void {
   this.afs.getCategories().subscribe(res => {
     this.categories = res;
     this.categories.forEach(category => {
       this.as.get(category.photoURL).subscribe(res => category.downloadURL = res);
       console.log(category)
     });
   });
  }

  goToCategory(id){
    console.log(id)
    this.router.navigate(['/category', id]);
  }

}
