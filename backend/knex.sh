#!/bin/bash

cd /backend 

apt update 
 
apt upgrade -y

npm i
  
npm i -g knex
 
npm start

knex migration:latest
