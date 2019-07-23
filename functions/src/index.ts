import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account-file.json');

const adminConfig: { credential: admin.credential.Credential, [key: string]: any } = JSON.parse(process.env.FIREBASE_CONFIG!);
adminConfig.credential = admin.credential.cert(serviceAccount);

admin.initializeApp(adminConfig);

interface User {
  email: string;
  provider?: string;
}

export const getUserByEmail: functions.TriggerAnnotated = functions.https.onCall(
  async (data: { email: string }): Promise<User | null> => {
    try {
      const userRecord = await admin.auth().getUserByEmail(data.email);
      if (userRecord) {
        if (Array.isArray(userRecord.providerData)) {
          return {
            email: userRecord.email!,
            provider: userRecord.providerData[0].providerId!,
          };
        } else {
          return {
            email: userRecord.email!,
          };
        }
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
