import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
	return knex
		.schema
		.createTable(ETableNames.company, table => {
			table.bigIncrements('id').primary().index();
			table.string('nome').notNullable().index().unique()
			table.string('razao_social').notNullable().index()
			table.string('cnpj').notNullable().index().unique()
			table.string('email').notNullable()
			table.string('tipo_banco').notNullable()
			table.string('responsavel').notNullable()

			table.comment('Tabela usada para armazenar informação de Empresa');
		});
}


export async function down(knex: Knex){
	return knex.schema.dropTable(ETableNames.company);
}