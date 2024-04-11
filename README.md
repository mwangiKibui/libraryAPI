### Library API

### Pre-Requisites
- [PostgreSQL](https://www.postgresql.org/download/) installed on your computer.
- [Node.js](https://nodejs.org/en) installed on your computer.

### Step by Step

- On the *.env* file. Update the database username and password.

- Install the packages, by running: 

    ```bash
    npm install
    ```

- Start the development server: 

    ```bash
    npm run dev
    ```

- Whenever you add a new column to any existing model, remember to run the below command to sync in the new column:

    ```bash
    npm run sync
    ```