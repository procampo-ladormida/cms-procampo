import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Webhook para productos
    strapi.db.lifecycles.subscribe({
      models: ['api::producto.producto'],
      async afterCreate(event) {
        await notifyWebhook('producto', 'create', event.result);
      },
      async afterUpdate(event) {
        await notifyWebhook('producto', 'update', event.result);
      },
      async afterDelete(event) {
        await notifyWebhook('producto', 'delete', event.result);
      },
    });

    // Webhook para ofertas
    strapi.db.lifecycles.subscribe({
      models: ['api::oferta.oferta'],
      async afterCreate(event) {
        await notifyWebhook('oferta', 'create', event.result);
      },
      async afterUpdate(event) {
        await notifyWebhook('oferta', 'update', event.result);
      },
      async afterDelete(event) {
        await notifyWebhook('oferta', 'delete', event.result);
      },
    });

    // Webhook para categorías
    strapi.db.lifecycles.subscribe({
      models: ['api::categoria.categoria'],
      async afterCreate(event) {
        await notifyWebhook('categoria', 'create', event.result);
      },
      async afterUpdate(event) {
        await notifyWebhook('categoria', 'update', event.result);
      },
      async afterDelete(event) {
        await notifyWebhook('categoria', 'delete', event.result);
      },
    });

    // Webhook para subcategorías
    strapi.db.lifecycles.subscribe({
      models: ['api::subcategoria.subcategoria'],
      async afterCreate(event) {
        await notifyWebhook('subcategoria', 'create', event.result);
      },
      async afterUpdate(event) {
        await notifyWebhook('subcategoria', 'update', event.result);
      },
      async afterDelete(event) {
        await notifyWebhook('subcategoria', 'delete', event.result);
      },
    });

    // Webhook para blogs
    strapi.db.lifecycles.subscribe({
      models: ['api::blog.blog'],
      async afterCreate(event) {
        await notifyWebhook('blog', 'create', event.result);
      },
      async afterUpdate(event) {
        await notifyWebhook('blog', 'update', event.result);
      },
      async afterDelete(event) {
        await notifyWebhook('blog', 'delete', event.result);
      },
    });
  },
};

async function notifyWebhook(type: string, action: string, data: any) {
  const webhookUrl = process.env.WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('⚠️ WEBHOOK_URL no configurada, saltando notificación');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBHOOK_SECRET || 'default-secret'}`,
      },
      body: JSON.stringify({
        type,
        action,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log(`✅ Webhook enviado exitosamente: ${type} ${action}`);
    } else {
      console.error(`❌ Error enviando webhook: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error enviando webhook:', error);
  }
}