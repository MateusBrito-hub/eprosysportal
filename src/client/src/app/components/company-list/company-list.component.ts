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
  companyStatus: { [key: number]: string } = {};
  lastStatus: { [key: number]: string } = {};

  constructor(private idService: GetIdSelectedCompanyService, private CompanyService: CompanyService, private SpedService: SpedService) { }

  async ngOnInit(): Promise<void> {
    this.companies = await this.CompanyService.getAllCompanies()
    this.filteredCompanies = this.companies;

    this.loadStatuses(this.companies)
  }

  async loadStatuses(companies: any[]): Promise<void> {
    const mesAtual = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());

    console.log(mesAtual)
    for (const company of companies) {
      const lastSped = await this.SpedService.getLastSpedByCompanyId(company.id);
      this.companyStatus[company.id] = lastSped
        ? (lastSped.mes_referente === mesAtual ? 'Enviado' : lastSped.status)
        : 'Nenhum SPED encontrado';
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

    // Obtém o último SPED da empresa
    const lastSped = await this.SpedService.getLastSpedByCompanyId(companyId);

    if (!lastSped) {
      console.warn('Nenhum SPED encontrado para essa empresa');
      return;
    }

    console.log('Ultimo SPED:', lastSped);

    const mesAtual = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());
    const mesAnterior = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
      new Date(new Date().setMonth(new Date().getMonth() - 1))
    );

    // Se o último SPED já for do mês atual e estiver no status "Enviado", não faz nada
    if (lastSped.mes_referente === mesAtual && lastSped.status === 'Enviado') {
      alert('SPED já enviado para o mês atual!');
      return
    } else {
      let newStatus = '';

      // Definir o próximo status com base no status atual
      switch (this.companyStatus[companyId]) {
        case 'Liberar':
        case 'liberar':
          newStatus = 'Gerado';
          break;
        case 'Gerado':
          newStatus = 'Enviado';
          break;
        case 'Enviado':
          if (lastSped.mes_referente !== mesAtual) {
            const newSped = {
              status: 'Liberar',
              liberacao: new Date().toISOString(),
              envio: 'null',
              mes_referente: mesAtual,
              arquivos: lastSped.arquivos,
              empresa_id: lastSped.empresa_id,
              suporte_id: lastSped.suporte_id,
            };

            try {
              await this.SpedService.createSped(newSped);
              this.companyStatus[companyId] = 'Liberar';
            } catch (error) {
              console.error('Erro ao criar novo SPED:', error);
              this.companyStatus[companyId] = this.lastStatus[companyId];
            }
            return;
          }
          break;
      }
      // Atualizar SPED se houver mudança de status
      if (newStatus) {
        if (newStatus !== 'Liberar') {
          lastSped.liberacao = new Date().toISOString();
        }

        if (newStatus === 'Enviado') {
          lastSped.envio = new Date().toISOString();
        }

        try {
          await this.SpedService.updateSped(Number(lastSped.id), {
            status: newStatus,
            liberacao: lastSped.liberacao,
            envio: lastSped.envio,
            mes_referente: lastSped.mes_referente,
            arquivos: lastSped.arquivos,
            empresa_id: lastSped.empresa_id,
            suporte_id: lastSped.suporte_id,
          });

          this.companyStatus[companyId] = newStatus;
        } catch (error) {
          console.error(`Erro ao atualizar status da empresa ${companyId}: `, error);
          this.companyStatus[companyId] = this.lastStatus[companyId]; // Reverte status em caso de erro
        }
      }
    }
  }
}
