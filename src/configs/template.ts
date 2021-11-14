import { join } from 'path';

export const TemplatesConfig = {
  getTemplate: (templateName: string) => {
    return join(__dirname, '..', '..', 'templates', templateName);
  }
};
