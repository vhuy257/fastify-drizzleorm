import { relations } from "drizzle-orm/relations";
import { variantAttributes, variantOptions, products, productVariants } from "./schema";

export const variantOptionsRelations = relations(variantOptions, ({one, many}) => ({
	variantAttribute: one(variantAttributes, {
		fields: [variantOptions.variantAttributeId],
		references: [variantAttributes.id]
	}),
	productVariants: many(productVariants),
}));

export const variantAttributesRelations = relations(variantAttributes, ({many}) => ({
	variantOptions: many(variantOptions),
}));

export const productVariantsRelations = relations(productVariants, ({one}) => ({
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.id]
	}),
	variantOption: one(variantOptions, {
		fields: [productVariants.variantOptionId],
		references: [variantOptions.id]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	productVariants: many(productVariants),
}));