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

    this.loadStatuses(this.companies)
  }

  async loadStatuses(companies: any[]): Promise<void> {
    for (let company of companies) {
      const sped = await this.SpedService.getSpedByCompanyId(company.id);
      this.companyStatus[company.id] = sped.status;
    }
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

  async changeStatus(company_id: number) {
    const companyId = company_id;

    this.lastStatus[companyId] = this.companyStatus[companyId];
    console.log()

    if (this.companyStatus[companyId] === 'Liberar') {
      this.companyStatus[companyId] = 'Gerado';
    } else if (this.companyStatus[companyId] === 'Gerado') {
      this.companyStatus[companyId] = 'Enviado';
    } else {
      this.companyStatus[companyId] = 'Liberar';
    }

    // Atualiza o status no banco de dados
    //await this.SpedService.updateSped(companyId, this.companyStatus[companyId]);

    console.log(`Empresa ID: ${companyId}, Novo Status: ${this.companyStatus[companyId]}`);
  }

}
