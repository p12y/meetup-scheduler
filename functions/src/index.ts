import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account-file.json');

const adminConfig: { credential: admin.credential.Credential, [key: string]: any } = JSON.parse(process.env.FIREBASE_CONFIG!);
adminConfig.credential = admin.credential.cert(serviceAccount);

admin.initializeApp(adminConfig);

interface User {
  email: string;
  provider: string;
}

export const getUserByEmail: functions.TriggerAnnotated = functions.https.onCall(
  async (data: { email: string }): Promise<User> => {
    try {
      const userRecord = await admin.auth().getUserByEmail(data.email);
      return {
        email: userRecord.email!,
        provider: userRecord.providerData[0].providerId!,
      };
    } catch (error) {
      const errorCodes: { [key: string]: functions.https.FunctionsErrorCode } = {
        'auth/user-not-found': 'not-found',
        'auth/invalid-email': 'invalid-argument',
      };
      const code: functions.https.FunctionsErrorCode = errorCodes[error.code] || 'unknown';
      throw new functions.https.HttpsError(code, error.message);
    }
  }
);