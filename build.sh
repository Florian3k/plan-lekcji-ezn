#!/bin/bash

SOURCE_FILE="xml_2012.xml"

if [ ! -f $SOURCE_FILE ]; then
  echo "File $SOURCE_FILE not found!"
  exit 1
fi

if ! command -v node > /dev/null; then
  echo "Node is missing"
  exit 1
fi

if ! command -v npm > /dev/null; then
  echo "Npm is missing"
  exit 1
fi

NODE_MAJOR_VERSION=$(node -v | cut -c 2- | cut -d'.' -f1)

if (( $NODE_MAJOR_VERSION < 8 )); then
  echo "Your node version is too old, pleasu use 8 or newer"
  exit 1
fi

CONVERTED_FILE="planEZN.xml"

iconv -f WINDOWS-1250 -t UTF-8 $SOURCE_FILE -o $CONVERTED_FILE

if [ ! -f $CONVERTED_FILE ]; then
  echo "Error when converting file to utf-8"
  exit 1
fi

node generateJson.js

npm run build
