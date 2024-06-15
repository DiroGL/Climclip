import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.chalknity.manotas',
  appName: 'Chalknity',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "140981854302-lcsd6ci2ubuo4lvhvtpem3grgei9msa0.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};

export default config;
