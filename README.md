# US National Parks

This simple project utilizes a Postgres data store of the national parks in the US.

It exposes an API accounting for all CRUD operations.

## Serving the React application locally 

Before running the app, install all dependencies using `npm ci`.
After which, run the following command to install the Nrwl Nx tools globally `npm install -g @nrwl/cli`.
This will allow us to directly run `nx` commands.

Now simply execute the following command: `npm start`.

## Serving the API

Assuming pre-requisites for package installations have been completed in the previous step, serving the API is as simple as running the following command: `nx run api:serve`.


## Key Points About this Project

- Utilizes the Nrwl Nx Workspace for creating a mono-repo, which can contain both an Node/Express API as well as a React web application. This makes it easy to share code across projects such as the example `api-interfaces` library defined in this project, which contain interfaces for the `Park` and `ParkType` objects. This insures consistency between projects. Also, `TypeScript`, schematics, and testing are all made easily available using `Nx` not including the simple deployment commands. 
- Exposes an API with all CRUD operatins available for ALL entities in the `Postgres` store. Only read, update, and delete have been made available in the `React` interface, but the rest should all be testable through Postman.
- The `Node API` makes use of `Express` with neatly defined routes and `Sequelize` to handle querying the `Postgres` data store. 
- Custom pagination "framework" using the React Bootstrap pagination UI elements.


### The API

#### `Park`
- GET: `/api/park`
- POST: `/api/park`
  ```json
  {
    "name": "string",
    "type": "string",
    "location": "string"
  }
  ```
- PUT: `/api/park/:parkId`
  ```json
  {
    "name": "string",
    "type": "string",
    "location": "string"
  }
  ```
- DELETE: `/api/park/:parkId`

#### `ParkType`
- GET: `/api/park-type`
- POST: `/api/park-type`
  ```json
  {
    "term": "string",
    "description": "string"
  }
  ```
- PUT: `/api/park-type/:parkTypeId`
  ```json
  {
    "term": "string",
    "description": "string"
  }
  ```
- DELETE: `/api/park-type/:parkTypeId`

### What's left?

There are a few things that I would have loved to have completed given a bit more time on the project.
- Smaller React components.
- Move Postgres credentials out of environment files and into environment variables. (not very secure)
- Unit testing.
- A slightly prettier UI, but Bootstrap does help.
