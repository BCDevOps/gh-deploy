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
  'deployment': flags.string({required: true, char: 'd', description: 'github deployment id'}),
  'state': flags.string({required: true, char: 's', description: 'the deployments state', options: Object.keys(STATUSES)}),
  'url': flags.string({char: 'u', description: 'The environment url (translates to log_url in the deployment status call)'}),
};

module.exports = StatusCommand;
