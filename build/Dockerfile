FROM node:alpine
LABEL com.jskubeclient.version="0.2.0"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .           
EXPOSE 8080
ENTRYPOINT ["npm", "start"]