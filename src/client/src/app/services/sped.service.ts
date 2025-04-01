import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments';
import axios from 'axios';
import { ISped } from '../models'

@Injectable({
  providedIn: 'root'
})

export class SpedService {
  private apiUrl = `${environment.API_URI}/sped`;

  constructor() {}

  async createSped(sped: ISped): Promise<ISped> {
    return axios.post<ISped>(this.apiUrl, sped).then(res => res.data);
  }

  async getAllCompanies(): Promise<ISped[]> {
    return axios.get<ISped[]>(this.apiUrl).then((res) => res.data);
  }

  async getSpedById(id: number): Promise<ISped> {
    if (id === 0) {
      id++
    }

    return axios.get<ISped>(`${this.apiUrl}/${id}`).then(res => res.data);
  }

  async getSpedByCompanyId(company_id: number): Promise<ISped> {

    return axios.get<ISped>(`${this.apiUrl}/${company_id}`).then(res => res.data);
  }

  async updateSped(id: number, sped: ISped): Promise<ISped> {
    return axios.put<ISped>(`${this.apiUrl}/${id}`, sped).then(res => res.data);
  }

  async deleteSped(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(res => res.data);
  }
}
