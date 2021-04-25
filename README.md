# BD Project - API + CLIENT - BITCOIN-APP

## Quick Startup
This script will run the docker-compose file in root. it will create mongodb instance, mongo client, express API server, and the react client.
after running this command you should see the client in localhost:8080, & the server at localhost:8081/get/:date (YYYY-MM-DD format)
the --build not really needed but just in case.
i skipped over security + some possible validations, and production scripts, just to keep things simple.
```javascript

yarn compose-up --build

```

Your can also run only the backend in docker environment, and use local-machine for running the client.
(I did not use the docker network to communicate between both, also for simplicity).
ports and everything stays basically the same.
```javascript

yarn compose-up --build server mongo

&

yarn client dev

```

## Start the server\client with nodemon(dev) locally

```javascript

yarn dev

```

## Cleanup script for dist folder

```javascript

yarn clean

```

## Notes
There is a small issue with css with react google charts, I noticed it too late to change things around this.
if your refresh when going from desktop widths to smaller ones, the js will take care of it, could get it to rerender by itself.
