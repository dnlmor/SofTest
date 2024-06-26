# SofTest
Your task is to create a simple NodeS application that includes a connection to a MongoDB database with environment-specific configurations for 3 environments (dev, release & prod) and load them dynamically.

In this application you should have a small model with minimal services (CRUD) while following proper git flow and branching techniques.
You will be judged based on the following:
• Cleanliness of the structure/approach applied
• Whether the application works or not
• Proper handling of git branches and git

Provide unit tests (with mocha, chai, supertest) for the previous assignment.

# Unit tests in React
Your next task is to create a frontend for your small NodeJS application (previously built). Your aim is to write unit tests for all your CRUD operations along with the possible user interactions to perform those operations.

Current Project Structure:
    back/
    │
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── tests/
    ├── .env                *gitignore*
    ├── .env.development    *gitignore*
    ├── .env.production     *gitignore*
    ├── .env.release        *gitignore*
    ├── .gitignore
    ├── app.js
    ├── package.json
    └── README.md

    front/
    │
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Item/
    │   ├── services/
    │   ├── App.js
    │   ├── index.js
    ├── package.json
    └── README.md

