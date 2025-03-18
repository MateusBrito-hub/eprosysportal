import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { GetIdSelectedCompanyService } from '../../services/getidselectedcompany.service'
import { CompanyService } from '../../services/company.service'
import { ICompany } from '../../models/company'

@Component({
  selector: 'app-campany-info',
  imports: [FormsModule],
  templateUrl: './campany-info.component.html',
  styleUrl: './campany-info.component.css'
})
export class CampanyInfoComponent {
  company: ICompany | null= null
  id: number | null = 1;

  constructor(private idService: GetIdSelectedCompanyService, private CompanyService: CompanyService) {}

  async ngOnInit(): Promise<void> {
    this.idService.id$.subscribe(async companyid => {
      this.id = companyid
      this.company = await this.CompanyService.getCompanyById(Number(this.id))
    })
  }
}
