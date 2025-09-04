import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.tags || !data.tags.connect || data.tags.connect.length < 2) {
      throw new ApplicationError('An article must have at least 2 tags associated with it.', {
        code: 'VALIDATION_ERROR'
      });
    }
  },

  async beforeUpdate(event: any) {
    const { data, where } = event.params;
    
    if (data.tags !== undefined) {
      const existingArticle = await strapi.entityService.findOne('api::article.article', where.id, {
        populate: { tags: true }
      }) as any;
      
      let currentTagIds = existingArticle.tags ? existingArticle.tags.map((tag: any) => tag.id) : [];
      console.log('Current tag IDs:', currentTagIds);
      
      if (data.tags.disconnect && Array.isArray(data.tags.disconnect)) {
        const disconnectIds = data.tags.disconnect.map((tag: any) => tag.id);
        currentTagIds = currentTagIds.filter((id: any) => !disconnectIds.includes(id));
        console.log('After disconnect:', currentTagIds);
      }
      
      if (data.tags.connect && Array.isArray(data.tags.connect)) {
        const connectIds = data.tags.connect.map((tag: any) => tag.id);
        connectIds.forEach((id: any) => {
          if (!currentTagIds.includes(id)) {
            currentTagIds.push(id);
          }
        });
        console.log('After connect:', currentTagIds);
      }
      
      if (data.tags.set && Array.isArray(data.tags.set)) {
        currentTagIds = data.tags.set.map((tag: any) => tag.id);
        console.log('After set:', currentTagIds);
      }
      
      const finalTagCount = currentTagIds.length;
      console.log('Final tag count after update:', finalTagCount);
      
      if (finalTagCount < 2) {
        throw new ApplicationError('An article must have at least 2 tags associated with it.', {
          code: 'VALIDATION_ERROR'
        });
      }
    }
  },
};
