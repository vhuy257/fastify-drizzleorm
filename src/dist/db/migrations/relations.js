"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRelations = exports.productVariantsRelations = exports.variantAttributesRelations = exports.variantOptionsRelations = void 0;
const relations_1 = require("drizzle-orm/relations");
const schema_1 = require("./schema");
exports.variantOptionsRelations = (0, relations_1.relations)(schema_1.variantOptions, ({ one, many }) => ({
    variantAttribute: one(schema_1.variantAttributes, {
        fields: [schema_1.variantOptions.variantAttributeId],
        references: [schema_1.variantAttributes.id]
    }),
    productVariants: many(schema_1.productVariants),
}));
exports.variantAttributesRelations = (0, relations_1.relations)(schema_1.variantAttributes, ({ many }) => ({
    variantOptions: many(schema_1.variantOptions),
}));
exports.productVariantsRelations = (0, relations_1.relations)(schema_1.productVariants, ({ one }) => ({
    product: one(schema_1.products, {
        fields: [schema_1.productVariants.productId],
        references: [schema_1.products.id]
    }),
    variantOption: one(schema_1.variantOptions, {
        fields: [schema_1.productVariants.variantOptionId],
        references: [schema_1.variantOptions.id]
    }),
}));
exports.productsRelations = (0, relations_1.relations)(schema_1.products, ({ many }) => ({
    productVariants: many(schema_1.productVariants),
}));
