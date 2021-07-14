module.exports = {
  exchangeClient: {
    input: {
      target: './src/swagger.json',
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
