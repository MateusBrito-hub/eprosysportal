import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { GetIdSelectedCompanyService } from '../../services/getidselectedcompany.service'
import { CompanyService } from '../../services/company.service'

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

  constructor(private idService: GetIdSelectedCompanyService, private CompanyService: CompanyService) {}

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
}
