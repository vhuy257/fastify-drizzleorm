import { pgTable, serial, varchar, timestamp, text, numeric, integer, foreignKey, boolean, primaryKey, pgEnum } from "drizzle-orm/pg-core"

export const role = pgEnum("role", ['viewer', 'editor', 'administrator'])
export const status = pgEnum("status", ['active', 'inactive', 'archived'])

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 64 }),
	password: varchar({ length: 64 }),
	createdAt: timestamp({ mode: 'string' }),
	birthday: text(),
	gender: text(),
	role: role(),
	avatar: varchar(),
});

export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	imageUrl: text("image_url").notNull(),
	name: text().notNull(),
	status: status().notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	stock: integer().notNull(),
	availableAt: timestamp("available_at", { mode: 'string' }).notNull(),
	description: text(),
});

export const variantOptions = pgTable("variant_options", {
	id: serial().primaryKey().notNull(),
	variantAttributeId: integer("variant_attribute_id").notNull(),
	value: varchar({ length: 255 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.variantAttributeId],
			foreignColumns: [variantAttributes.id],
			name: "variant_options_variant_attribute_id_variant_attributes_id_fk"
		}),
]);

export const variantAttributes = pgTable("variant_attributes", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
});

export const actionLogs = pgTable("action_logs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "action_logs_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	events: text(),
	createdAt: text(),
	eventsType: varchar("events_type"),
});

export const investment = pgTable("investment", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "investment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	totalAmountVnd: numeric("total_amount_vnd"),
	totalAmountCoin: numeric("total_amount_coin"),
	coinName: text("coin_name"),
	dateBuy: text("date_buy"),
	isBuy: boolean().default(true),
	totalAmountUsdt: numeric("total_amount_usdt"),
	dotPrice: numeric("dot_price"),
});

export const productVariants = pgTable("product_variants", {
	productId: integer("product_id").notNull(),
	variantOptionId: integer("variant_option_id").notNull(),
	stock: integer().notNull(),
	price: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_variants_product_id_products_id_fk"
		}),
	foreignKey({
			columns: [table.variantOptionId],
			foreignColumns: [variantOptions.id],
			name: "product_variants_variant_option_id_variant_options_id_fk"
		}),
	primaryKey({ columns: [table.productId, table.variantOptionId], name: "product_variants_product_id_variant_option_id_pk"}),
]);
