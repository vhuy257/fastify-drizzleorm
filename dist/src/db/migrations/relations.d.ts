export declare const variantOptionsRelations: import("drizzle-orm/relations").Relations<"variant_options", {
    variantAttribute: import("drizzle-orm/relations").One<"variant_attributes", true>;
    productVariants: import("drizzle-orm/relations").Many<"product_variants">;
}>;
export declare const variantAttributesRelations: import("drizzle-orm/relations").Relations<"variant_attributes", {
    variantOptions: import("drizzle-orm/relations").Many<"variant_options">;
}>;
export declare const productVariantsRelations: import("drizzle-orm/relations").Relations<"product_variants", {
    product: import("drizzle-orm/relations").One<"products", true>;
    variantOption: import("drizzle-orm/relations").One<"variant_options", true>;
}>;
export declare const productsRelations: import("drizzle-orm/relations").Relations<"products", {
    productVariants: import("drizzle-orm/relations").Many<"product_variants">;
}>;
