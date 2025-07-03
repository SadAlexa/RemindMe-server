FROM node:latest as builder

WORKDIR /remindme-builder

COPY . .

RUN npm install
RUN npm run build

FROM node:alpine

WORKDIR /remindme-server

ENV PORT=3000

COPY --from=builder /remindme-builder/dist ./dist
COPY --from=builder /remindme-builder/package*.json .

RUN npm install --omit=dev

EXPOSE 3000

CMD [ "node", "dist/src/main" ]
