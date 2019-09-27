# Gh-Deploy
A simple CLI and node package that wraps creating github deployments and statuses

Github Deployments API docs can be found [here](https://developer.github.com/v3/repos/deployments/)
## Startup

### As A CLI

`npx gh-deploy -h`

### As a node module

`npm install --save gh-deploy`

```js
// in a js file

import { createDeployment, createDeploymentStatus } from 'gh-deploy'

createDeployment({
  environment: 'production'
}, repo, owner, token)
.then(() => null);

createDeploymentStatus({
  state: 'success'
}, repo, owner, token)
.then(() => null);
```
