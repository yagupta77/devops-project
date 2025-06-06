#!/bin/bash

mkdir -p ../docker/nginx/certs

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ../docker/nginx/certs/self.key \
  -out ../docker/nginx/certs/self.crt \
  -subj '/C=IN/ST=RJ/L=JAIPUR/O=YourOrg/OU=Dev/CN=localhost'

echo "✅ Self-signed certificate created in ../docker/nginx/certs/"
