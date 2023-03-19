# INDIVIDUAL ASSIGNMENT: Deploy a Walking Skeleton

This repository contains a walking skeleton. Create a CI pipeline to test the application and deploy it in Render.com.

## Part A: CI Pipeline
1. Create one test for the api.
2. Create one test for the client.
3. Setup a Github Actions workflow. You can use the starter code in `.github/workflows/ci.yaml`. The worflow should:
   - Start the containers.
   - Run the tests. This needs to be done in separate steps, since there will be a test in the api and another in the client.

## Part B: Deploy to Render
1. Create file `render.yaml` in the root folder.
2. Add Infrastructure as code (IaC) using [Render's Blueprint Specification](https://render.com/docs/blueprint-spec) to support the client, api and database.
3. Log into Render and go to the Blueprints section.
4. Create a new blueprint instance from the repo.
5. Select `main` as the branch to trigger the deployment.
6. Confirm you can run your app in the live environment.

Render defines infrastructure in a specific way. The client and api are web services and the database defined separately. A basic structure looks like this:
```
services:
  - type: web
    name: client
    # rest of the configuration 
  - type: web
    name: api
    # rest of the configuration
databases:
  - name: db
    # rest of the configuration
```

Each service has a number of key properties: 
- `env` defines how it will be run. The client is `static`, the api is `docker`.
- `rootDir` is the folder where the code for the service resides.
- `envVars` lists the environment variables for each service. Render allows you to reference properties from other services or databases. This is very useful when you need to communicate between the parts.

For example, to set `DATABASE_URL` to the value of the deployed database connection string, add the below code to `envVars`:
```
- key: DATABASE_URL
   fromDatabase:
      name: db
      property: connectionString
```

And to set an environment variable `EXAMPLE` that references the api endpoint, add the below code to `envVars`: 
```
- key: EXAMPLE
   fromService:
      type: web
      name: api
      envVarKey: RENDER_EXTERNAL_URL
```

Read about the  [predefined environment variables](https://render.com/docs/environment-variables) and the [blueprint specification](https://render.com/docs/blueprint-spec) to find more details and the other properties.

## Acceptance Criteria
1. The CI Pipeline runs correctly in Github Actions, all the tests pass and there is a green check mark.
2. The application's client, api and database is deployed correctly on Render.
3. The client's public url can be loaded in a browser, the client app loads correctly and you can add multiple todos.
4. When refreshed, the client app retains the todos.
