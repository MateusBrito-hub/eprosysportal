import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../services/user.service';
import { SpedService } from '../../services/sped.service'
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-personal-demands',
  imports: [CommonModule, FormsModule,],
  templateUrl: './personal-demands.component.html',
  styleUrl: './personal-demands.component.css'
})
export class PersonalDemandsComponent {

  constructor(private userService: AuthService, private SpedService: SpedService, private CompanyService: CompanyService) { }

  demands: any[] = [];
  user: any;
  company: any;

  returnCompanyName(id: number) {
    this.CompanyService.getCompanyById(id).then((res) => {
      this.company = res;
      return this.company.nome;
    }).catch((err) => {
      console.log(err)
    })
  }

  finishDemand(demand: any) {
    const { empresa_nome, ...dataToSend } = demand;
    dataToSend.status = 'Finalizado';

    this.SpedService.updateSped(demand.id, { ...dataToSend, status: 'Finalizado' }).then((res) => {
      console.log(res)
      demand.status = 'Finalizado'
    }).catch((err) => {
      console.log(err)
      console.log(demand)
    })
  }


  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    console.log(this.user)
    this.SpedService.getSpedByUserId(this.user.userId).then(async (res) => {
      // Armazena temporariamente os demands
      const updatedDemands = await Promise.all(res.map(async (demand: any) => {
        try {
          const company = await this.CompanyService.getCompanyById(demand.empresa_id);
          return {
            ...demand,
            empresa_nome: company.nome // adiciona o nome da empresa
          };
        } catch (error) {
          console.error(`Erro ao buscar empresa ${demand.empresa_id}`, error);
          return {
            ...demand,
            empresa_nome: 'Empresa não encontrada' // fallback
          };
        }
      }));

      this.demands = updatedDemands;
      console.log(this.demands);
    }).catch((err) => {
      console.log(err);
    });
  }


}
