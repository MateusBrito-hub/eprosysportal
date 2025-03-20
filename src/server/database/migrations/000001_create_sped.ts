import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
	return knex
		.schema
		.createTable(ETableNames.sped, table => {
			table.bigIncrements('id').primary().index();
			table.string('status').notNullable().index().unique()
			table.string('liberacao').notNullable().index().unique()
			table.string('envio').notNullable().unique()
			table.string('mes_referente').notNullable()
			table.string('arquivos').notNullable()
			table.bigInteger('empresa_id').notNullable().references('id').inTable(ETableNames.company).onUpdate('CASCADE').onDelete('RESTRICT');
			table.bigInteger('suporte_id').notNullable().references('id').inTable(ETableNames.user).onUpdate('CASCADE').onDelete('RESTRICT');

			table.comment('Tabela usada para armazenar informação de SPED');
		});
}


export async function down(knex: Knex) {
	return knex.schema.dropTable(ETableNames.sped);
}