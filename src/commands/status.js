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
import {createDeploymentStatus} from '../index';

const STATUSES = {
  error: 'error',
  failure: 'failure',
  inactive: 'inactive',
  in_progress: 'in_progress',
  queued: 'queued',
  pending: 'pending',
  success: 'success',
};

class StatusCommand extends Command {
  async run() {
    const {flags} = this.parse(StatusCommand);
    const {repo, owner, token, ...rest} = flags;

    const options = {
      ...rest,
    };

    if (options['url']) {
      options.log_url = options['url'];
    }

    if (options.deployment) {
      options.deployment_id = options.deployment;
    }

    await createDeploymentStatus(options, repo, owner, token);
    this.log('Created status');
    process.exit(0);
  }
}

StatusCommand.description = `Creates a github deployment status
...
* = required
usage: --repo=foo *
       --owner=bar * 
       --token=asdf1234 * 
       --state=queued *
       --deployment=12354123
       --url=https://path-to-my-env.com
returns status id if successful
`;

StatusCommand.flags = {
  'repo': flags.string({required: true, char: 'r', description: 'github repo name'}),
  'owner': flags.string({required: true, char: 'o', description: 'github owner name'}),
  'token': flags.string({required: true, char: 't', description: 'github access token (required correct permissions)'}),
  'deployment': flags.string({required: true, description: 'github deployment id'}),
  'description': flags.string({char: 'd', description: 'description for your deployment status'}),
  'state': flags.string({required: true, char: 's', description: 'the deployments state', options: Object.keys(STATUSES)}),
  'url': flags.string({char: 'u', description: 'The environment url (translates to log_url in the deployment status call)'}),
};

module.exports = StatusCommand;
