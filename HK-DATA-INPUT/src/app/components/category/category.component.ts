import { StorageService } from './../../services/storage.service';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private afs: DatabaseService, private as: StorageService, private router: Router) { }
category: object = {};
article: object = {
  id: '',
  image_ids: [],
  title: 'New Article',
  text: ''
}
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
    this.category['article_ids'].push(this.article['id']);
    this.afs.saveCategory(this.category);
  }

  addArticle(){
    this.afs.saveArticle(this.article, this.category['category_id']).then(res => {
      console.log(res);
      this.article['id'] = res;
      console.log(this.article['id']);
      this.afs.getArticle(this.article['id']).subscribe(res => {
        this.category['article_ids']
        console.log(res)}
      );
    });
  }
  goToArticle(id){
    console.log(id)
    this.router.navigate(['/article',id]);
  }


}
