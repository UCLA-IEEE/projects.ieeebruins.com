# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


<!-- WEBMASTER COMMENTS -->
# Deploy With vercel
1. set up the vercel CLI
2. you run ```vercel login``` and log in using the webmaster email
(webmaster@ieeebruins.com)

Then you can...
3. commit change to any branch on Github
4. inside branch, run vercel -- this will deploy it to pre-production
5. view deployment using links provided
6. when ready to deploy, run vercel --prod -- this will deploy it to production!