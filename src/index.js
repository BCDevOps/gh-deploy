/* eslint-disable max-len */
//                               @bcgov/gh-deploy
// A CLI and importable node module wrapper around the github deployments api
// api info can be found here https://developer.github.com/v3/repos/deployments/

import Octokit from '@octokit/rest';
import oclif from '@oclif/command';

/**
 * Create Deployment
 * @param {Object} options the deployment payload
 * @param {String} options.ref the branch/tag/commit to create deployment for
 * @param {Boolean} options.auto_merge Attempts to automatically merge the default
 *                                     branch into the requested ref, if it's behind
 *                                     the default branch. Default: true
 * @param {Array} options.required_contexts The status contexts to verify against commit
 *                                          status checks. If you omit this parameter,
 *                                          GitHub verifies all unique contexts before creating
 *                                          a deployment. To bypass checking entirely,
 *                                          pass an empty array. Defaults to all unique contexts.
 * @param {String} options.payload JSON payload with extra information about the deployment. Default: ""
 * @param {String} options.environment Name for the target deployment environment (e.g., production, staging, qa). Default: production
 * @param {String} options.description Short description of the deployment. Default: ""
 * @param {Boolean} options.transient_environment Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future. Default: false
 * @param {String} repo the repo name
 * @param {String} owner the github owner
 * @param {String} token the github access token
 * @return {Promise} the deployment payload, including the id which is important for updating the status
 */
export const createDeployment = (options, repo, owner, token = '') => {
  const o = new Octokit({auth: token});
  return o.repos.createDeployment({...options, repo, owner});
};

/**
  * Create Deployment Status
  * @param {Object} options
  * @param {String} options.state Required. The state of the status. Can be one of error, failure, inactive, in_progress, queued pending, or success. Note: To use the inactive state, you must provide the application/vnd.github.ant-man-preview+json custom media type. To use the in_progress and queued states, you must provide the application/vnd.github.flash-preview+json custom media type.
  * @param {String} options.deployment_id Required. The deployment id
  * @param {String} options.log_url The full URL of the deployment's output. This parameter replaces target_url. We will continue to accept target_url to support legacy uses, but we recommend replacing target_url with log_url. Setting log_url will automatically set target_url to the same value. Default: ""
  * @param {String} repo the repo name
  * @param {String} owner the github owner
  * @param {String} token the github access token
  * @return {Promise}
  */
export const createDeploymentStatus = (options, repo, owner, token = '') => {
  const o = new Octokit({auth: token});
  return o.repos.createDeploymentStatus({...options, repo, owner});
};


export default oclif;
