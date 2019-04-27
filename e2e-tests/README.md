# Template project for Protractor and Cucumber

Based on the test setup on the following links:
* https://semaphoreci.com/community/tutorials/getting-started-with-protractor-and-cucumber

## Prerequisites

Start it in a commandline:
```
# Install dependencies
yarn
# Needs to be executed after every yarn dependency update
yarn wm:update
# Start the webdriver-manager
yarn wm:start
```

## Running the test cases
To execute the test cases execute the following:
```
yarn start
```

You can also execute just specific tags of tests with
```
TAGS=@SomeTag yarn start
```

To get also the HTML report (screenshots etc.) you can execute:
```
TAGS=@Sometags yarn start; yarn html-report
```

## Docker builds / execution

Build a local docker container
```
docker build . -t study-grousp/e2e-tests
```

Execute the container (IP should be replaced with your public IP address):
```
docker run -e SELENIUM_ADDRESS=http://192.168.100.21:4444/wd/hub study-grousp/e2e-tests
```

## Defining a different selenium address

Define the SELENIUM_ADDRESS environment variable.

```
export SELENIUM_ADDRESS=...
```

