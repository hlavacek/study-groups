```
aws dynamodb put-item \
--region eu-west-1 \
--table-name sg-exams-dev \
--item file://data/exam1.json

aws dynamodb put-item \
--region eu-west-1 \
--table-name sg-exams-dev \
--item file://data/exam2.json
```


## Run a local dynamo db:
```
docker run -d --rm --name dynamodb -p 8000:8000 amazon/dynamodb-local
```