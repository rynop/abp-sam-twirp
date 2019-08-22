import 'isomorphic-fetch';
import { createAuthSvc } from './ts-protobuf/platform.twirp';
import { com } from './ts-protobuf/platform.pb';
import { Platform, TwirpError } from './ts-json/index';

require('dotenv').config({ path: __dirname + '/../.env' });

const firebaseToken = process.env.FIREBASE_TOKEN || "";
const testURL = process.env.PLATFORM_URL || "";

// Protobuf client
async function pbTests() {
  const ps = createAuthSvc(testURL);
  const msg: com.abpsamtwirp.platform.ITokenReq = {
    firebaseToken
  };

  try {
    const d = await ps.token(msg);
  } catch (error) {
    console.error('pb client error', error);
  }
}

// JSON client
async function jsonTests() {
  try {
    const ps = new Platform.DefaultAuthSvc(testURL, fetch, false, {
      'X-Ryan-Test': 'HELLO WORLD'
    });
    const tm: Platform.TokenReq = {
      firebasetoken: firebaseToken
    };
    const tr: Platform.TokenRes = await ps.token(tm);
    console.log('JSON client token response', tr);
  } catch (error) {
    switch (error.constructor) {
      case TwirpError:
        console.error('is a TwirpError!');
        break;
    }
    console.error('json client error', error);
  }
}

pbTests();
jsonTests();
