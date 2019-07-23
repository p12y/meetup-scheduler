import firebase from 'lib/firebase';

class Providers {
  providerNames = ['Facebook', 'Google', 'Twitter', 'Mail'];
  facebook = new firebase.auth.FacebookAuthProvider().providerId;
  google = new firebase.auth.GoogleAuthProvider().providerId;
  twitter = new firebase.auth.TwitterAuthProvider().providerId;

  getProviderIdByName(name) {
    return {
      Facebook: this.facebook,
      Google: this.google,
      Twitter: this.twitter,
    }[name];
  }

  getProviderNameById(providerId) {
    return {
      [this.facebook]: 'Facebook',
      [this.google]: 'Google',
      [this.twitter]: 'Twitter',
    }[providerId];
  }
}

export const providers = new Providers();
