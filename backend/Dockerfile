FROM node:12.10.0-buster-slim

MAINTAINER juca

# cria um usuario so pra rodar a app no container (sem ser root)
RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm@6.10.3

# variavel de ambiente, onde o vai ficar o projeto dentro do container
ENV HOME=/home/app

COPY package.json $HOME/backend/
# usuario vai ter permissao de rodar essa app e nada fora de contexto
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/backend/
RUN npm install --silent --progress=false && npm audit fix

# usuario agora é root por que preciso fazer outras coisas que o app não consegue
USER root
COPY . $HOME/backend/
RUN chown -R app:app $HOME/*
USER app

CMD [ "npm", "start" ]
