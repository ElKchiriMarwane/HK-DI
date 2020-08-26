import { Observable } from 'rxjs';
import { StorageService } from './../../services/storage.service';
import { DatabaseService } from './../../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnChanges {
article = {};
images = [];
  constructor(private route: ActivatedRoute, private afs: DatabaseService, private as: StorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      console.log(p.id);
      this.afs.getArticle(p.id).subscribe(res => {
        this.article= res as object;
        this.article['image_ids'].forEach(image => {
          this.as.get(image).subscribe(img => this.images.push(img));
        });

        console.log(res)
      });
    });
  }
  ngOnChanges(): void {


  }
  save(file: HTMLInputElement) {
    this.images = [];
    console.log(this.article)
    this.as.upload(file.files[0]);
    this.article['image_ids'].push(file.files[0].name);
    this.afs.saveUniqueArticle(this.article);
  }

}
