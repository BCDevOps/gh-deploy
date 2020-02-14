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
import {getPendingDeployments} from '..';


class DeploymentCommand extends Command {
  async run() {
    const {flags} = this.parse(DeploymentCommand);
    const {repo, owner, token, env, ...rest} = flags;
    const options = {
      ...rest,
      ref: rest.ref || 'master',
      mediaType: {
        previews: ['ant-man', 'flash'],
      },
    };

    // octokit will get deployments made to all environments if no environment is passed
    // we are just adding some more UX by allowing an 'all' environment to be pass
    if (env && env.toLowerCase() !== 'all') {
      options.environment = env;
    }

    try {
      const pendingDeploys = await getPendingDeployments(options, repo, owner, token);
      this.log(pendingDeploys, '\n');
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
       --ref=mybranch
       --env=production // defaults to all environments
       --task=foo
       --sha=1iasksdflkjsdf
  returns a number if successful
`;

DeploymentCommand.flags = {
  'repo': flags.string({required: true, char: 'r', description: 'github repo name'}),
  'owner': flags.string({required: true, char: 'o', description: 'github owner name'}),
  'token': flags.string({required: true, char: 't', description: 'github access token (required correct permissions)'}),
  'ref': flags.string({required: false, description: 'github ref,branch, or commit hash (defaults to master)'}),
  'env': flags.string({required: false, char: 'e', description: 'the environment to check deployments against\n defaults to all environments'}),
  'task': flags.string({required: false, description: 'The name of the task for the deployment'}),
  'sha': flags.string({required: false, description: 'The SHA recorded at creation time'}),
};

module.exports = DeploymentCommand;
