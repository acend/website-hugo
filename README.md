# Acend Website

This website is built with [Victor Hugo](https://github.com/netlify-templates/victor-hugo), a boilerplate for using [Hugo](https://gohugo.io/) as a static site generator and [Webpack](https://webpack.js.org/) as your asset pipeline.
Victor Hugo uses [PostCSS](http://postcss.org/) and [Babel](https://babeljs.io/) for CSS and JavaScript compiling/transpiling.

## Usage

You don't have to have npm installed locally with this setup

### Prerequisites

First step, clone this repository and run:

```bash
export HUGO_VERSION=$(grep "FROM klakegg/hugo" Dockerfile | sed 's/FROM klakegg\/hugo://g' | sed 's/ AS builder//g')
docker run --rm --interactive -p 8080:8080 -v $(pwd):/src klakegg/hugo:${HUGO_VERSION}-ci /bin/bash -c "set -euo pipefail;npm ci"
```

This will take some time and will install all packages necessary to run Victor Hugo and its tasks.

### Development

While developing your website, use:

```bash
export HUGO_VERSION=$(grep "FROM klakegg/hugo" Dockerfile | sed 's/FROM klakegg\/hugo://g' | sed 's/ AS builder//g')
docker run --rm --interactive -p 8080:8080 -v $(pwd):/src klakegg/hugo:${HUGO_VERSION}-ci /bin/bash -c "set -euo pipefail; npm start"
```

or for developing your website with `hugo server --buildDrafts --buildFuture`, use:

```bash
export HUGO_VERSION=$(grep "FROM klakegg/hugo" Dockerfile | sed 's/FROM klakegg\/hugo://g' | sed 's/ AS builder//g')
docker run --rm --interactive -p 8080:8080 -v $(pwd):/src klakegg/hugo:${HUGO_VERSION}-ci /bin/bash -c "set -euo pipefail;npm run preview"
```

Then visit <http://localhost:8080/> _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Build using Docker

Build the image:

```bash
docker build -t acend/website-hugo .
```

Run it locally:

```bash
docker run -i -p 8080:8080 -e BACKEND_URL=http://localhost:8080 acend/website-hugo
```

**Note:** the `-e BACKEND_URL` param is needed due to the fact that we expect a Backend to be ready for the integration of several Backends.

### Using Buildah and Podman

Build the image:

```bash
buildah build-using-dockerfile -t acend/website-hugo:latest .
```

Run it locally with the following command. Beware that `--rmi` automatically removes the built image when the container stops, so you either have to rebuild it or remove the parameter from the command.

```bash
podman run --rm --rmi --interactive -e BACKEND_URL=http://localhost:8080 --publish 8080:8080 localhost/acend/website-hugo
```

## Structure

```bash
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--css              // Webpack will bundle imported css separately
|  |--index.js         // index.js is the webpack entry for your css & js assets
```

## Update Dependencies

First update dependency in the `package.json` file.
Then run the following command:

```bash
export HUGO_VERSION=$(grep "FROM klakegg/hugo" Dockerfile | sed 's/FROM klakegg\/hugo://g' | sed 's/ AS builder//g')
docker run --rm --interactive -v $(pwd):/src klakegg/hugo:${HUGO_VERSION}-ci /bin/bash -c "set -euo pipefail;npm install"
```

This will make sure, the package-lock.json file is updates accordingly.

Build the container image and test the deployment.

## Deployment

### Pull Request (PR)

Upon each PR, a GitHub Action [pull_request.yaml](.github/workflows/pull_request.yaml) is triggered which builds a Docker image and pushes it to `quay.io/acend/website-hugo:staging` on Quai.io. The image will be deployed by the Workflow.

### Push to Master

Once a PR gets accepted and merged to master, a similar GitHub Action [push.yaml](.github/workflows/pull_request.yaml) will trigger with a push to `quay.io/acend/website-hugo:latest` and a deployment to <https://acend.ch>.
