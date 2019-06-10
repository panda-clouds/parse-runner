
# FROM mindmissiles/parse-server
# This version has SES adapter built in
FROM parseplatform/parse-server:3.1.3

USER root
RUN apk update && \
    apk upgrade && \
    apk add git && \
    npm i --save parse-server-amazon-ses-adapter && \
    mkdir -p /parse-server/cloud

ADD . /parse-server/cloud

USER node

CMD [ "npm", "start" ]
