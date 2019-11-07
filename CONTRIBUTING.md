## Contributing


Thanks for taking a look at this project  :) 

Here are a few short notes on improving the capabilities of `gh-deploy`. 


1. Whe leveraging new Github API's , ensure your CLI program  is __fully__ compatible with the api's  extra options.  

For example the __Get  Deployments__ API  at  GET /repos/:owner/:repo/deployments has 
__four request parameters__: `sha, ref,  environment, task`.

Ensure that all of these parameters are passable into the CLI even if you chose not to use them in
your implementation of the program. 

