FROM node:18-alpine

WORKDIR /usr/src/app

# Copia apenas os manifests primeiro para aproveitar cache
COPY package*.json ./

# Instala as dependências (inclui o pg que você adicionou)
# prefira ci se tiver package-lock.json
RUN npm ci

# Agora copia o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
