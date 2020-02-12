import {
  createDeployment,
  getPendingDeployments,
  createDeploymentStatus,
} from '..';

jest.mock('@octokit/rest', () => ({
  Octokit: class {
  // eslint-disable-next-line require-jsdoc
    get repos() {
      return {
        createDeployment: () => Promise.resolve({data: {id: 'foo'}}),
        createDeploymentStatus: () => Promise.resolve({data: {}}),
        listDeployments: () => Promise.resolve({data: [{id: 'foo'}]}),
        listDeploymentStatuses: () =>
          Promise.resolve({
            data: [{state: 'success', updated_at: '2019-11-07T06:06:31Z'}],
          }),
      };
    }
  },
}));

describe('Utility Functions', () => {
  test('createDeployment returns a promise', () => {
    expect(createDeployment() instanceof Promise).toBe(true);
  });

  test('createDeploymentStatus returns a promise', () => {
    expect(createDeploymentStatus() instanceof Promise).toBe(true);
  });

  test('getPendingDeployments returns a promise', () => {
    expect(getPendingDeployments() instanceof Promise).toBe(true);
  });
})
;
