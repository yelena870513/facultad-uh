import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ContentInterface} from '../../interfaces/content.interface';
import {CategoryInterface} from '../../interfaces/category.interface';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})

export class ContentComponent implements OnInit{
  content: ContentInterface[];
  categories: CategoryInterface[];
  constructor(private dataService: DataService, private translate: TranslateService) {}
  ngOnInit(): void {
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.content = data.docs.filter(f => (f.tipo === 'content' && !f._deleted));
        this.categories = data.docs.filter(f => (f.tipo === 'category' && !f._deleted));
      });
  }
}

