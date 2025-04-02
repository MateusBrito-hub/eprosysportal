import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { GetIdSelectedCompanyService } from '../../services/getidselectedcompany.service'
import { CompanyService } from '../../services/company.service'
import { SpedService } from '../../services/sped.service'
import { ISped } from '../../models';
import { last } from 'rxjs';

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
  companyStatus: { [key: number]: string } = {};
  lastStatus: { [key: number]: string } = {};

  constructor(private idService: GetIdSelectedCompanyService, private CompanyService: CompanyService, private SpedService: SpedService) { }

  async ngOnInit(): Promise<void> {
    this.companies = await this.CompanyService.getAllCompanies()
    this.filteredCompanies = this.companies;

    this.loadStatuses(this.companies)
  }

  async loadStatuses(companies: any[]): Promise<void> {

    for (let company of companies) {
      // Pega o último SPED da empresa
      const lastSped = await this.SpedService.getLastSpedByCompanyId(company.id);
      console.log(company, lastSped)
      if (lastSped) {
        this.companyStatus[company.id] = lastSped.status;  // Define o status como o do último SPED
      } else {
        this.companyStatus[company.id] = 'Nenhum SPED encontrado';  // Caso não haja SPED
      }
    }

  }

  selectedId(companyid: number): void {
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

  async changeStatus(companyId: number): Promise<void> {
    this.lastStatus[companyId] = this.companyStatus[companyId];

    // Pega o último SPED da empresa carregado em loadStatuses
    const lastSped = await this.SpedService.getLastSpedByCompanyId(companyId);
    if (!lastSped) {
      console.log('Nenhum SPED encontrado para essa empresa');
      return;
    }

    let newStatus = '';
    const mesAnterior = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );

    // Define o próximo status com base no status atual
    if (this.companyStatus[companyId] === 'Liberar') {
      newStatus = 'Gerado';
    } else if (this.companyStatus[companyId] === 'Gerado') {
      newStatus = 'Enviado';
    } else if (this.companyStatus[companyId] === 'Enviado') {
      const newSped = {
        status: 'Liberar',
        liberacao: new Date().toISOString(),
        envio: 'null',
        mes_referente: mesAnterior,
        arquivos: lastSped.arquivos,
        empresa_id: lastSped.empresa_id,
        suporte_id: lastSped.suporte_id,
      };

      try {
        await this.SpedService.createSped(newSped);
      } catch (error) {
        console.log(error);
        this.companyStatus[companyId] = this.lastStatus[companyId]; // Reverte status em caso de erro
      }
      return;
    }

    if (newStatus !== 'Liberar') {
      lastSped.liberacao = new Date().toISOString();
    }

    if (newStatus === 'Enviado') {
      lastSped.envio = new Date().toISOString();
    }

    try {
      await this.SpedService.updateSped(companyId, {
        status: newStatus,
        liberacao: lastSped.liberacao,
        envio: lastSped.envio,
        mes_referente: lastSped.mes_referente,
        arquivos: lastSped.arquivos,
        empresa_id: lastSped.empresa_id,
        suporte_id: lastSped.suporte_id
      });
      this.companyStatus[companyId] = newStatus;
    } catch (error) {
      console.error(`Erro ao atualizar status da empresa ${companyId}:`, error);
      this.companyStatus[companyId] = this.lastStatus[companyId]; 
    }
  }


}
