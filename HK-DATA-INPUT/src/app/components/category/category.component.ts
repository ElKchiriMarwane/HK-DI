import { StorageService } from './../../services/storage.service';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private afs: DatabaseService, private as: StorageService) { }
category: object = {};
image;
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      console.log(p.id);
      this.afs.getCategory(p.id).subscribe(res => {
        this.category = res as object
        this.as.get(this.category['photoURL']).subscribe(img => this.image = img);
      });
    });
  }

  save(file : HTMLInputElement){
    this.as.upload(file.files[0]);
    this.category['photoURL'] = file.files[0].name;
    this.afs.saveCategory(this.category);
  }


}
