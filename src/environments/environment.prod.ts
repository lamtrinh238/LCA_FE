import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  api: {
    baseUrl: 'https://lcaapi.herokuapp.com',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh',
  },
} as Environment;
