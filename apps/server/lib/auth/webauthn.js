import { generatePKCE } from '../utils/pkce.js';
import { client } from '../index.js';

const EDGEDB_AUTH_BASE_URL = process.env.EDGEDB_AUTH_BASE_URL;

async function getWebAuthnOptions(email, socket) {
  try {
    if (!email) {
      return socket.emit('auth-webauthn-register-options', {error: 'Invalid request. Email is required.'})
    }

    let user = await client.query('SELECT User { email } FILTER .email = <str>$email', { email });

    if (user.length !== 0) {
      return socket.emit('auth-webauthn-register-options', {error: 'User already exists.'})
    }

    // user = await client.query('INSERT User { email := <str>$email }', { email });

    const registerUrl = new URL('webauthn/register/options', EDGEDB_AUTH_BASE_URL);

    registerUrl.searchParams.set('email', email);

    const response = await fetch(registerUrl.href);
    if (!response.ok) {
      const text = await response.text();
      return socket.emit('auth-webauthn-register-options', {error: `Error from auth server: ${text}`})
    }

    const data = await response.json();

    // data 중 challenge, user의 id는 stringToUint8Array를 이용해 변환하기
    data.challenge = truncateToMaxBytes(data.challenge,64);
    data.user.id = truncateToMaxBytes(data.user.id,64);

    return data

  } catch (error) {
    console.error('Error in GET /auth/webauthn/register/options', error);
    return socket.emit('auth-webauthn-register-options', {error: 'Internal Server Error'})
  }
}


function stringToUint8Array(str) {
  return Uint8Array.from(str, c => c.charCodeAt(0));
}

// 문자열을 최대 바이트 수 이하로 제한하여 변환
function truncateToMaxBytes(str, maxBytes) {
  const uint8Array = stringToUint8Array(str);
  if (uint8Array.length > maxBytes) {
    return uint8Array.slice(0, maxBytes);
  }
  return uint8Array;
}


async function postWebAuthnRegister(data, socket) {

  const { challenge, verifier } = generatePKCE();
  const { email, provider, credentials, verify_url, user_handle } = data;

  if (!email || !provider || !credentials || !verify_url || !user_handle) {
    console.log('Invalid request. Empty Values')
    return socket.emit('auth-webauthn-register', {error: 'Invalid request. Empty Values'})
  }

  console.log('credentials >> ', credentials)
  try {
    const registerUrl = new URL('webauthn/register', EDGEDB_AUTH_BASE_URL);

    const response = await fetch(registerUrl.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, provider, credentials, verify_url, user_handle, challenge })
    });

    console.log('response >>', response)
    if (!response.ok) {
      const text = await response.text();
      return socket.emit('auth-webauthn-register', {error: `Error from auth server: ${text}`})
    }

    const result = await response.json();
    console.log('result >>', result)

    // const tokenUrl = new URL("token", EDGEDB_AUTH_BASE_URL);
    // tokenUrl.searchParams.set("code", result.code);
    // tokenUrl.searchParams.set("verifier", verifier);
    // const tokenResponse = await fetch(tokenUrl.href);

    // console.log('tokenResponse >>', tokenResponse)

    // if (!tokenResponse.ok) {
    //   return socket.emit('auth-webauthn-register', {error: 'Failed to get token'})
    // }

    return result

  } catch (error) {
    console.error('Error in POST /auth/webauthn/register', error);
    return socket.emit('auth-webauthn-register', {error: 'Internal Server Error'})
  }
}

export { getWebAuthnOptions, postWebAuthnRegister };
