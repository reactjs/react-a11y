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

## Additional Resources
* [GitHub pull request help](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/)
