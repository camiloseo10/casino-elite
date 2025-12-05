// types/product.ts (Asegúrate de que este archivo esté actualizado)

// Tipos de Shopify GraphQL simplificados
export type Image = {
  url: string;
  altText?: string;
};

export type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml?: string;
  images?: {
    edges: {
      node: Image;
    }[];
  };
  variants?: { // Puede que necesites esto para otros casos
    edges: {
      node: ProductVariant;
    }[];
  };
  priceRange?: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  availableForSale: boolean;
};

export type ProductVariant = {
  id: string; // merchandiseId
  title: string;
  price: MoneyV2;
  product: Product; // Referencia al producto principal
  // Otros campos que necesites, como compareAtPrice, selectedOptions
};

export type CartLine = {
  id: string; // lineId
  quantity: number;
  merchandise: ProductVariant; // Aquí merchandise es el ProductVariant
  cost: {
    totalAmount: MoneyV2;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
    totalDutyAmount?: MoneyV2;
    totalTaxAmount?: MoneyV2;
  };
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  totalQuantity: number; // Campo que indica la cantidad total de ítems en el carrito
};