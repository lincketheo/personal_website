#!/bin/bash


docker build -t personal_website .
docker tag personal_website lincketheo/personal_website:latest
docker image push lincketheo/personal_website:latest
