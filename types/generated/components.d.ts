import type { Schema, Struct } from '@strapi/strapi';

export interface BenefitsBenefits extends Struct.ComponentSchema {
  collectionName: 'components_benefits_benefits';
  info: {
    displayName: 'benefits';
    icon: 'handHeart';
  };
  attributes: {
    benefits: Schema.Attribute.String;
  };
}

export interface IngredientsMainIngredients extends Struct.ComponentSchema {
  collectionName: 'components_ingredients_main_ingredients';
  info: {
    displayName: 'main_ingredients';
    icon: 'seed';
  };
  attributes: {
    ingredients: Schema.Attribute.String;
  };
}

export interface SpecificationsSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_specifications_specifications';
  info: {
    displayName: 'specifications';
    icon: 'heart';
  };
  attributes: {
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'benefits.benefits': BenefitsBenefits;
      'ingredients.main-ingredients': IngredientsMainIngredients;
      'specifications.specifications': SpecificationsSpecifications;
    }
  }
}
