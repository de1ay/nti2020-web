#!/bin/bash
while getopts i:u:r:p:s: option
do
case "${option}"
in
u) USER=${OPTARG};;
p) PASSWORD=${OPTARG};;
r) REGISTRY=${OPTARG};;
i) IMAGE=${OPTARG};;
esac
done
docker login -u $USER -p $PASSWORD $REGISTRY
if docker ps | grep -q nti2020-web
then
docker stop nti2020-web
docker rm nti2020-web
docker pull $IMAGE:latest
fi
docker run -d -p 80:80/tcp --restart=always --name nti2020-web $IMAGE:latest
docker image prune -f