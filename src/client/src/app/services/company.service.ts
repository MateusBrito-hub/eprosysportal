import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments';
import axios from 'axios';
import { ICompany } from '../models'

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private apiUrl = `${environment.API_URI}/company`;

  constructor() {}

  async createCompany(company: ICompany): Promise<ICompany> {
    return axios.post<ICompany>(this.apiUrl, company).then(res => res.data);
  }

  async getAllCompanies(): Promise<ICompany[]> {
    return axios.get<ICompany[]>(this.apiUrl).then((res) => res.data);
  }

  async getCompanyById(id: number): Promise<ICompany> {
    if (id === 0) {
      id++
    }

    return axios.get<ICompany>(`${this.apiUrl}/${id}`).then(res => res.data);
  }

  async updateCompany(id: number, company: ICompany): Promise<ICompany> {
    return axios.put<ICompany>(`${this.apiUrl}/${id}`, company).then(res => res.data);
  }

  async deleteCompany(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`).then(res => res.data);
  }
}
