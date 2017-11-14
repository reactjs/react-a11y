# Contributing to react-a11y

## Setting up the workspace

Before you can submit a Pull Request you'll need to do the following:

1. Fork the repository on GitHub

2. Clone your fork

```bash
git clone https://github.com/<your_username>/react-a11y.git
cd react-a11y
```

3. Install for development

```bash
npm install
```

## Workflow

Lint the code:

```bash
npm run lint
```

Run the tests:

```bash
npm run mocha // run tests using mocha only
npm run karma // run tests using karma only
npm run test  // run tests using both mocha and karma
```

Build the code:

```bash
npm run build
```

## Making changes

1. Checkout a new branch and name it accordingly to what you intend to do

```bash
git checkout -b <branch_name>
```

2. Make your intended changes, being sure to run the tests and lint the code.
 
## Submitting a Pull Request

1. Commit your changes (please make commits small and commit messages descriptive):

```bash
    git commit -m "..."
```

2. Push to _your_ github repo:
```bash
git push origin <branch_name>
```

3. Go to the GitHub page and click "New Pull request".
4. Write a good description of the change.

After sending a pull request, other developers will review and discuss your change. Please address all the comments. Once everything is all right, one of the maintainers will merge your changes in.

## Publishing (for maintainers)
_These steps are for maintainers only and can be disregarded by contributors._

For publishing use the following workflow:

1. Make sure all code changes for this new version have already been committed.

2. Update the CHANGELOG.md by using the following command, double check the content and save (don't commit):
```bash
npm run changelog -- -t <the upcoming version>
```
where `<the upcoming version>` refers to the version number that you are preparing to publish

3. Update the version and publish.  This is done by running _one_ of the following scripts:

```bash
npm version:patch  # for a patch version update i.e. v1.0.0 -> v1.0.1
npm version:minor  # for a minor version update i.e. v1.0.0 -> v1.1.0
npm version:major  # for a major version update i.e. v.1.0.0 -> v2.0.0
```

### The publishing scripts
After running one of the above `version:*` scripts the following things will take place in this order:

1. the `preversion` script will run which does the following:

    1. The tests will be run and the entire process will halt if they do not all pass

    2. A check will be performed to validate that the `CHANGELOG.md` has been updated and it is the only uncommitted change in the repo.  If this check fails the process will be halted.

2. the selected `version:*` script will run which does the following: 

    1. The version in `package.json` will be incremented as requested (patch, minor, major).  _Because the `--no-git-tag-version` flag is specified this script will not yet include tagging and committing in the github repo._

3. the `postversion` script will be run which does the following:

    1. A `git commit` will be made including only the `package.json` and `CHANGELOG.md` files.  It will include a commit comment in the format of: "Version $npm_package_version"
    
    2. Performs a `git tag` in the format of "v$npm_package_version"
    
    3. Performs a `git push` and `git push --tags`
    
    4. Runs `npm publish`


## Additional Resources
* [GitHub pull request help](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/)
