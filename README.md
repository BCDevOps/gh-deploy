# Gh-Deploy
A simple CLI and node package that wraps creating github deployments and statuses

Github Deployments API docs can be found [here](https://developer.github.com/v3/repos/deployments/)

## Why Wrap This as a CLI?

Creating Deployment Statuses are typically coupled to some type of automation in a pipeline. Most pipeline
technologies have a way to run scripts under a `NodeJS`. Our organization has found it extremely useful to 
fire off single line scripts inside of our pipeline scripts because:
- it is clear and readable
- dependencies are not coupled to the pipeline technology

## Startup

### As A CLI

`npx @bcgov/gh-deploy -h`

- Create Deployments `@bcgov/gh-deploy deployment -h`
- View Pending Deployments `@bcgov/gh-deploy pendingDeployments -h`
- Create Deployment Status `@bcgov/gh-deploy status -h`

### As a Node Module

`npm install --save @bcgov/gh-deploy`

## createDeployment

creates a deployment to a given environment

```js
// in a js file

import { createDeployment } from '@bcgov/gh-deploy'

createDeployment({
  environment: 'production'
}, repo, owner, token)
.then(() => null);
```

## createDeploymentStatus

creates a status for a specific deployment

```js
// in a js file

import { createDeploymentStatus } from '@bcgov/gh-deploy'

createDeploymentStatus({
  state: 'success'
}, repo, owner, token)
.then(() => null);

```

## getPendingDeployments

returns number of pending deployments

```js
// in a js file

import { getPendingDeployments } from '@bcgov/gh-deploy'

getPendingDeployments({
  environment: 'production',
}, repo, owner, token)
.then(() => null);

```


## Contributions Accepted

While the Contributions Docs are quite slim, I'm happy to take any PR's to improve this project.