# Docugate
A GraphQL-based gateway to interact with Documize. Initally providing search functionality.

## To Run

### Locally

- copy and edit env file as needed `cp .env.production.example .env.production`
- install project dependencies `npm install`
- build project `npm run build`
- run `npm start`

### On Openshift

> this app is leveraging the [bcdk](https://github.com/bcDevOps/bcdk), many of the processes to build and deploy
have been abstracted into scripts within `.pipeline/`

- To build: 
  > open up a pr in github
  - change into pipeline directory `cd .pipeline/.lib`
  - install project dependencies `npm install`
  - `npm run build -- --pr=<pr number>`
  This will build the application in the tools namespace as configuired in `./.pipeline/lib/config.js`

- To deploy:
  - change into pipeline directory `cd .pipeline/.lib`
  - install project dependencies `npm install` (if not already run)
  - `npm run deploy -- --pr=<pr number> --env=<dev|test|prod>`

  ### With Jenkins
  > please note that eventually build and deploy should and will be controlled via a _jenkins job_. 
  This will automatically build/deploy on the creation of a pr. 


## Supported GraphQL Queries
> graphql queries can be introspected with graphql visualization tools like [GraphQlPlayground](https://github.com/prisma-labs/graphql-playground)

- Searching
```graphql
query {
  search(searchString: "foo", limit: 10) {
    id
    ...
    ...
  }
}
```