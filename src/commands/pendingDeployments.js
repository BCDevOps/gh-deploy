/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Command, flags} from '@oclif/command';
import {createDeployment} from '../index';
import {isString} from 'util';

class DeploymentCommand extends Command {
  async run() {
    const {flags} = this.parse(DeploymentCommand);
    const {repo, owner, token, ...rest} = flags;
    const options = {
      ...rest,
      ref: rest.ref,
    };

    if (rest.env && rest.env.toLowerCase() !== 'all') {
      options.environment = 'all';
    }

    try {
      const deployment = await createDeployment(options, repo, owner, token);
      this.log(deployment.data.id);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
    process.exit(0);
  }
}

DeploymentCommand.description = `Returns number of pending deployments made against a ref
...
* = required
usage: --repo=foo *
       --owner=bar * 
       --token=asdf1234 * 
       --ref=mybranch *
       --env=production // defaults to all environments

  returns a number if successful
`;

DeploymentCommand.flags = {
  'repo': flags.string({required: true, char: 'r', description: 'github repo name'}),
  'owner': flags.string({required: true, char: 'o', description: 'github owner name'}),
  'token': flags.string({required: true, char: 't', description: 'github access token (required correct permissions)'}),
  'ref': flags.string({required: true, char: 'r', description: 'github ref,branch, or commit hash'}),
  'env': flags.string({required: false, char: 'e', description: 'the environment to check deployments against\n defaults to all environments'}),
};

module.exports = DeploymentCommand;
