import 'dotenv/config';
export default {
  expo: {
    name: 'MannMitra Prototype',
    slug: 'mannmitra-prototype',
    version: '1.0.0',
    extra: {
      EXPO_FIREBASE_API_KEY: process.env.EXPO_FIREBASE_API_KEY,
      EXPO_FIREBASE_AUTH_DOMAIN: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
      EXPO_FIREBASE_PROJECT_ID: process.env.EXPO_FIREBASE_PROJECT_ID,
      EXPO_FIREBASE_STORAGE_BUCKET: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
      EXPO_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
      EXPO_FIREBASE_APP_ID: process.env.EXPO_FIREBASE_APP_ID,
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8080'
    }
  }
}
