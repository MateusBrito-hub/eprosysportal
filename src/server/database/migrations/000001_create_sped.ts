import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
	return knex
		.schema
		.createTable(ETableNames.sped, table => {
			table.bigIncrements('id').primary().index();
			table.string('status').notNullable().index()
			table.string('liberacao').notNullable().index()
			table.string('envio').notNullable()
			table.string('mes_referente').notNullable().unique()
			table.string('arquivos').notNullable()
			table.bigInteger('empresa_id').notNullable().references('id').inTable(ETableNames.company).onUpdate('CASCADE').onDelete('RESTRICT');
			table.bigInteger('suporte_id').notNullable().references('id').inTable(ETableNames.user).onUpdate('CASCADE').onDelete('RESTRICT');

			table.comment('Tabela usada para armazenar informação de SPED');
		});
}


export async function down(knex: Knex) {
	return knex.schema.dropTable(ETableNames.sped);
}