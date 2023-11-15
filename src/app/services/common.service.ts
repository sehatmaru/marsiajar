import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponsei } from '../interface/common.interface';
import { Service } from './service';
import { CategoryModel } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private root = 'common';
  private CATEGORY = 'category';
  
  constructor(private commonApi: Service) { }

  getCategoryList(): Observable<CommonResponsei<CategoryModel[]>> {
    return this.commonApi.get(`${this.root}/${this.CATEGORY}/list`) as Observable<CommonResponsei<CategoryModel[]>>;
  }

}
