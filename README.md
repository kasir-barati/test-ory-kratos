# Instruction to start it

## Clone ORY Kratos on your local machine

1. `git clone git@github.com:ory/kratos.git`
2. `docker pull oryd/kratos:latest-sqlite`
3. `docker pull oryd/kratos-selfservice-ui-node:latest`
4. `cd kratos`
5. `docker-compose -f quickstart.yml -f quickstart-standalone.yml up --build --force-recreate`

## Now its time to launch our own app:

1. `pnpm install --frozen-lockfile`
2. `pnpm start:dev`
