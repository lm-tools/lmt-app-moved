# Lmt-app-moved

[![Build status][build status image]][ci]

A static page app used when an app is deprecated or moved, based on [express], which looks like [gov.uk]

[![Deploy][heroku deploy image]][heroku deploy hook]

## Dev setup

Use node 6.11.1 and npm >5. Setup with [nvm](https://github.com/creationix/nvm):

```sh
$ nvm install 6.11.1
$ npm install -g npm@5.2.0
``` 

Setup the application:

```sh
$ npm install
$ npm run watch
```

## Mounting the application in a directory

This app must be passed the `EXPRESS_BASE_PATH` environment variable. This determines the static page served.

For example, to mount the application at `/your-work-search`, run:

```sh
$ EXPRESS_BASE_PATH=/your-work-search npm run start
```

Then navigate to `localhost:3000/your-work-search` and you will be presented with the `your-work-search` view

## Creating a new static app

You simply add your <app_name>.mustache template in the views directory, and start the app with the `EXPRESS_BASE_PATH`
set to `/<app_name>`. Use `lmt-deploy` project to deploy and maintain a new service for this app

[build status image]: https://api.travis-ci.org/lm-tools/lmt-app-moved.svg
[ci]: https://travis-ci.org/lm-tools/lmt-app-moved
[express]: http://expressjs.com/
[gov.uk]: https://www.gov.uk/
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[heroku deploy hook]: https://heroku.com/deploy
