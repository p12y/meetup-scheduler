# Meetup Polls

This is a React app that uses Firebase authentication, Cloud Firestore database and Cloud Functions.

## Installation

1. Clone the repository
2. Install packages with `yarn`
3. Add Firebase config into `.env.development` file with the following env variables:
   ```
   REACT_APP_API_KEY="..."
   REACT_APP_AUTH_DOMAIN="..."
   REACT_APP_DATABASE_URL="..."
   REACT_APP_PROJECT_ID="..."
   REACT_APP_STORAGE_BUCKET="..."
   REACT_APP_MESSAGING_SENDER_ID="..."
   REACT_APP_APP_ID="..."
   ```
   It's worth noting that these are public API keys and don't need to be kept secret, but having a different Firebase project for dev & prod environments allows for development without affecting the production database.
4. Start the development server with `yarn start`

## Deployment

This project is using Firebase hosting. To deploy the project, follow the below steps.

1. Globally install Firebase CLI
2. Run `firebase init` in the root folder of the project
3. Configure project to use hosting and functions
4. Build for production with `yarn build`
5. Deploy entire project with `firebase depoy`
6. To deploy functions only, run `firebase deploy --only functions`
7. To deploy hosting only, run `firebase deploy --only hosting`
