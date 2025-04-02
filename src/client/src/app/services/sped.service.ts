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

  async getAllSped(): Promise<ISped[]> {
    return axios.get<ISped[]>(this.apiUrl).then((res) => res.data);
  }

  async getSpedById(id: number): Promise<ISped> {
    if (id === 0) {
      id++
    }

    return axios.get<ISped>(`${this.apiUrl}/${id}`).then(res => res.data);
  }

  async getSpedByCompanyId(id: number): Promise<ISped> {

    return axios.get<ISped>(`${this.apiUrl}/status/${id}`).then(res => res.data);
  }

  async getLastSpedByCompanyId(companyId: number): Promise<ISped | null> {
    try {
      const response = await axios.get<ISped[]>(`${this.apiUrl}/?filter=${companyId}`);
      const speds = response.data;
      console.log(speds)
      return speds && speds.length ? speds[speds.length - 1] : null;
    } catch (error) {
      console.error('Erro ao buscar SPEDs:', error);
      return null;
    }
  }

  async updateSped(id: number, sped: ISped): Promise<ISped> {
    return axios.put<ISped>(`${this.apiUrl}/${id}`, sped).then(res => res.data);
  }

  async deleteSped(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(res => res.data);
  }
}
