module.exports = {
  apiClient: {
    input: {
      target: '../../apps/zero-api/swagger.json',
    },
    output: {
      client: 'react-query',
      mode: 'tags',
      target: './src/client',
      override: {
        mutator: './src/response-type.ts',
      },
    },
  },
};
