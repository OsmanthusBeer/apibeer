FROM node:18

WORKDIR /app/api-beer

COPY . /app/api-beer

RUN cd /app/api-beer
RUN chmod -R 777 *
RUN npm install -g pnpm
RUN pnpm install

EXPOSE 40000

CMD [ "npm", "run", "preview" ]
