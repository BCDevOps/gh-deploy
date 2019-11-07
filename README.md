# Gh-Deploy
A simple CLI and node package that wraps creating github deployments and statuses

Github Deployments API docs can be found [here](https://developer.github.com/v3/repos/deployments/)
## Startup

### As A CLI

`npx @bcgov/gh-deploy -h`

### As a node module

`npm install --save @bcgov/gh-deploy`


### API


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
