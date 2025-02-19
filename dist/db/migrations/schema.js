"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariants = exports.investment = exports.actionLogs = exports.variantAttributes = exports.variantOptions = exports.products = exports.users = exports.status = exports.role = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.role = (0, pg_core_1.pgEnum)("role", ['viewer', 'editor', 'administrator']);
exports.status = (0, pg_core_1.pgEnum)("status", ['active', 'inactive', 'archived']);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    email: (0, pg_core_1.varchar)({ length: 64 }),
    password: (0, pg_core_1.varchar)({ length: 64 }),
    createdAt: (0, pg_core_1.timestamp)({ mode: 'string' }),
    birthday: (0, pg_core_1.text)(),
    gender: (0, pg_core_1.text)(),
    role: (0, exports.role)(),
    avatar: (0, pg_core_1.varchar)(),
});
exports.products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    name: (0, pg_core_1.text)().notNull(),
    status: (0, exports.status)().notNull(),
    price: (0, pg_core_1.numeric)({ precision: 10, scale: 2 }).notNull(),
    stock: (0, pg_core_1.integer)().notNull(),
    availableAt: (0, pg_core_1.timestamp)("available_at", { mode: 'string' }).notNull(),
    description: (0, pg_core_1.text)(),
});
exports.variantOptions = (0, pg_core_1.pgTable)("variant_options", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    variantAttributeId: (0, pg_core_1.integer)("variant_attribute_id").notNull(),
    value: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.variantAttributeId],
        foreignColumns: [exports.variantAttributes.id],
        name: "variant_options_variant_attribute_id_variant_attributes_id_fk"
    }),
]);
exports.variantAttributes = (0, pg_core_1.pgTable)("variant_attributes", {
    id: (0, pg_core_1.serial)().primaryKey().notNull(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
});
exports.actionLogs = (0, pg_core_1.pgTable)("action_logs", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "action_logs_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    events: (0, pg_core_1.text)(),
    createdAt: (0, pg_core_1.text)(),
    eventsType: (0, pg_core_1.varchar)("events_type"),
});
exports.investment = (0, pg_core_1.pgTable)("investment", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "investment_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    totalAmountVnd: (0, pg_core_1.numeric)("total_amount_vnd"),
    totalAmountCoin: (0, pg_core_1.numeric)("total_amount_coin"),
    coinName: (0, pg_core_1.text)("coin_name"),
    dateBuy: (0, pg_core_1.text)("date_buy"),
    isBuy: (0, pg_core_1.boolean)().default(true),
    totalAmountUsdt: (0, pg_core_1.numeric)("total_amount_usdt"),
    dotPrice: (0, pg_core_1.numeric)("dot_price"),
});
exports.productVariants = (0, pg_core_1.pgTable)("product_variants", {
    productId: (0, pg_core_1.integer)("product_id").notNull(),
    variantOptionId: (0, pg_core_1.integer)("variant_option_id").notNull(),
    stock: (0, pg_core_1.integer)().notNull(),
    price: (0, pg_core_1.integer)().notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.productId],
        foreignColumns: [exports.products.id],
        name: "product_variants_product_id_products_id_fk"
    }),
    (0, pg_core_1.foreignKey)({
        columns: [table.variantOptionId],
        foreignColumns: [exports.variantOptions.id],
        name: "product_variants_variant_option_id_variant_options_id_fk"
    }),
    (0, pg_core_1.primaryKey)({ columns: [table.productId, table.variantOptionId], name: "product_variants_product_id_variant_option_id_pk" }),
]);
