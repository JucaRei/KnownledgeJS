#!/bin/bash

cd /backend 

npm i
  
npm i -g knex 

knex migration:latest