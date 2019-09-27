require('dotenv').config({
  path: '.env.production',
});

import '@babel/polyfill';
import {ApolloServer, gql} from 'apollo-server';
import {
  GraphQLDateTime,
} from 'graphql-iso-date';
import DocumizeRestApi from './datasources/documize';
import {URLResolver} from 'graphql-scalars';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`      
  scalar Date
  scalar URL
  type SearchResult {
    id: String!
    orgId: String
    itemId: String
    itemType: String
    documentId: String
    documentSlug: String
    document: String
    excerpt: String
    tags: String
    spaceId: String
    space: String
    spaceSlug: String
    template: String
    url: URL
    versionId: String
    created: Date
    revised: Date
  } 

  # The "Query" type is the root of all GraphQL queries.
  type Query {    
    search( limit: String, searchString: String!): [SearchResult]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
  Query: {
    search: (_, {searchString, limit}, {dataSources}) => dataSources.DocumizeRestApi.search(searchString, limit),
  },
  Date: GraphQLDateTime,
  URL: URLResolver,
};

// Start ApolloServer by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    DocumizeRestApi: new DocumizeRestApi({
      baseURL: process.env.DOCUMIZE_BASE_URL,
    }),
  }),
});

// This `listen` method launches a web-server.
server.listen().then(({url}) => {
  console.log(`🚀  RocketGate Rocket.Chat GraphQL search gateway ready at ${url}`);
});
