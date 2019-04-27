FROM node:8.9-alpine

# JRE Installation - required for selenium client
# copied from https://github.com/docker-library/openjdk/blob/master/8-jre/alpine/Dockerfile

# set /app directory as default working directory
WORKDIR /home/node

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock ./

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --frozen-lockfile

# Update webdriver manager
ADD protractor.conf.js ./

RUN yarn wm:update

ENV NODE_ENV production

# copy all file from current dir to /app in container
COPY . .

# ARG CI_COMMIT_SHA
# ARG CI_REPOSITORY_URL

# LABEL org.label-schema.vcs-ref=$CI_COMMIT_SHA \
#       org.label-schema.vcs-url=$CI_REPOSITORY_URL

# cmd to start service
CMD [ "/home/node/start.sh" ]
