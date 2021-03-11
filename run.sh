#!/usr/bin/env bash

IP=`ifconfig eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}'`
bundle exec jekyll server --host $IP