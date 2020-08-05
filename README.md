# Lmt-app-moved

[![Build status][build status image]][ci]

A static page app used when an app is deprecated or moved, based on [express], which looks like [gov.uk]

[![Deploy][heroku deploy image]][heroku deploy hook]

## Dev setup

Use node 12.18.3. Setup with [nvm](https://github.com/creationix/nvm):

```sh
$ nvm install 12.18.3
``` 

Ensure `node_modules/.bin` is on your path

Setup the application:

```sh
$ npm install
$ npm run watch
``` 

## Mounting the application in a directory

The app will run mounted at `/` by default. To run within a directory, set the
`EXPRESS_BASE_PATH` environment variable.

For example, to mount the application at `/cool-path`, run:

```sh
$ EXPRESS_BASE_PATH=/cool-path npm run start
```

Then navigate to `localhost:3000/cool-path/your-work-search` and you will be presented with the `your-work-search` view

## Specify single view

If you wish to only serve specific views (in addition to the error and cookie views), 
set the `VIEW` param to the value of the view you wish to serve as the homepage. The corresponding 
view mustache templates must match the following path convention:
`app/views/static_<view>.mustache`

For example:

 ```sh
 $ VIEW=your-work-search EXPRESS_BASE_PATH=/your-widdle-waddle node bin/www
 ```
 
serves `app/views/static_your-work-search.mustache` when you go to 
`localhost:3000/your-widdle-waddle`

## Creating a new static app

You simply add your <app_name>.mustache template in the views directory, and start the app with the `EXPRESS_BASE_PATH`
set to `/<app_name>`. Use `lmt-deploy` project to deploy and maintain a new service for this app

[build status image]: https://api.travis-ci.org/lm-tools/lmt-app-moved.svg
[ci]: https://travis-ci.org/lm-tools/lmt-app-moved
[express]: http://expressjs.com/
[gov.uk]: https://www.gov.uk/
[heroku deploy image]: https://www.herokucdn.com/deploy/button.svg
[heroku deploy hook]: https://heroku.com/deploy
