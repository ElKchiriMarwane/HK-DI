import { Observable } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private afs: DatabaseService) { }
category: object = {};
  ngOnInit(): void {
    this.route.params.subscribe(p => {
      console.log(p.id);
      this.afs.getCategory(p.id).subscribe(res => this.category = res as object);
    });
  }

  save(){
    this.afs.saveCategory(this.category);
  }


}
