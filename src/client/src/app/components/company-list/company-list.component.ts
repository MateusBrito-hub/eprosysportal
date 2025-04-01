import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { GetIdSelectedCompanyService } from '../../services/getidselectedcompany.service'
import { CompanyService } from '../../services/company.service'
import { SpedService } from '../../services/sped.service'

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent {
  companies: any[] = []
  filteredCompanies: any[] = [];
  searchTerm: string = '';
  companyStatus:  { [key: number]: string } = {};
  lastStatus: { [key: number]: string } = {};

  constructor(private idService: GetIdSelectedCompanyService, private CompanyService: CompanyService, private SpedService: SpedService) {}

  async ngOnInit(): Promise<void> {
    this.companies = await this.CompanyService.getAllCompanies()
    this.filteredCompanies = this.companies;
  }

  selectedId(companyid: number) :void {
    this.idService.sendId(companyid)
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredCompanies = this.companies;
    } else {
      this.filteredCompanies = this.companies.filter(company =>
        company.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  chargerStatus(company: any): void {
    this.lastStatus[company.id] = company.status;

    if (company.status === 'Liberar') {
      company.status = 'Gerado';
      console.log(company.status)
    } else if (company.status === 'Gerado') {
      company.status = 'Enviado';
      console.log(company.status)
    } else {
      company.status = 'Liberar';
      console.log(company.status)
    }
  }

}
