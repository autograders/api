FROM node:16.13.2-buster

# create application directory
RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

# switch to application directory
WORKDIR /home/node/app

# copy files
COPY --chown=node:node . .

# change user
USER node

# build application
RUN yarn && \
    yarn build && \
    yarn cache clean && \
    mv src/graphql dist && \
    rm -rf src tsconfig.json tsconfig.build.json yarn.lock .npmrc .cmd commitlint.config.js

# expose app port
EXPOSE 5000

# run application
CMD [ "node", "."]
