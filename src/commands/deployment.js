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
import {PREVIEWS} from '../constants';

class DeploymentCommand extends Command {
  async run() {
    const {flags} = this.parse(DeploymentCommand);
    const {
      repo,
      owner,
      token,
      env,
      'auto-merge': autoMerge,
      'required-contexts': requiredContexts,
      'transient-environment': transientEnvironment,
      ...rest
    } = flags;
    const options = {
      ...rest,
      environment: env || rest.environment,
      mediaType: {previews: [PREVIEWS.ANT_MAN]},
    };

    options.auto_merge = autoMerge;

    if (requiredContexts) {
      if (requiredContexts === '[]') {
        options.required_contexts = [];
      } else {
        options.required_contexts = requiredContexts.split(',');
      }
    }

    if (transientEnvironment) {
      options.transient_environment = transientEnvironment;
    }

    // if payload is a json string evaluate it
    if (options.payload && isString(options.payload)) {
      try {
        options.payload = JSON.parse(options.payload);
      } catch (e) {
        console.error('--payload flag must have a JSON formatted string as a value');
        process.exit(1);
      }
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

DeploymentCommand.description = `Creates a github deployment
...
* = required
usage: --repo=foo *
       --owner=bar *
       --token=asdf1234 *
       --ref=mybranch *
       --env=production
       --payload='{"hello": "world"}'
       --[no-]auto-merge
       --required-contexts=foo,bar,baz OR [] for no contexts
       --description='this is a description'
       --transient-environment
returns deployment id if successful
`;

DeploymentCommand.flags = {
  'repo': flags.string({required: true, char: 'r', description: 'github repo name'}),
  'owner': flags.string({required: true, char: 'o', description: 'github owner name'}),
  'token': flags.string({
    required: true,
    char: 't',
    description: 'github access token (required correct permissions)',
  }),
  'ref': flags.string({required: true, description: 'github ref,branch, or commit hash'}),
  'env': flags.string({
    char: 'e',
    description: 'the deployment environment (production, qa, test, development etc)',
  }),
  'payload': flags.string({
    char: 'p',
    description: 'a json string that contains any extra context you need for your deployment',
  }),
  'auto-merge': flags.boolean({
    description: 'auto merge the default branch into pr (see gh deployments api for reference)',
    default: true,
    allowNo: true,
  }),
  'required-contexts': flags.string({
    description: 'parameter allows you to specify a subset of contexts that must be success',
  }),
  'description': flags.string({char: 'd', description: 'description for your deployment'}),
  'transient-environment': flags.boolean({
    description:
      'Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future.',
  }),
};

module.exports = DeploymentCommand;
