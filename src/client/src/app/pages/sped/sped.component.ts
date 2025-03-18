import { Component } from '@angular/core';
import { CompanyListComponent } from '../../components/company-list/company-list.component'
import { CampanyInfoComponent } from '../../components/campany-info/campany-info.component'

@Component({
  selector: 'app-main',
  standalone:true,
  imports: [CompanyListComponent, CampanyInfoComponent],
  templateUrl: './sped.component.html',
  styleUrl: './sped.component.css'
})
export class SpedComponent {

}
