import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
	return knex
		.schema
		.createTable(ETableNames.user, table => {
			table.bigIncrements('id').primary().index();
			table.string('nome').notNullable().index().unique()
			table.string('cpf').notNullable().index().unique()
			table.string('email').notNullable().unique()
			table.string('password').notNullable()
			table.integer('user_type').notNullable()
			table.string('contato').notNullable()

			table.comment('Tabela usada para armazenar informação de Usuário');
		});
}


export async function down(knex: Knex){
	return knex.schema.dropTable(ETableNames.user);
}