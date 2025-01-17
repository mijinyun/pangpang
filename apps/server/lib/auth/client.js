import { WebAuthnClient } from "@edgedb/auth-core/webauthn";

const webAuthnClient = new WebAuthnClient({
  signupOptionsUrl: "http://localhost:3001/auth/webauthn/register/options",
  signupUrl: "http://localhost:3001/auth/webauthn/register",
  signinOptionsUrl: "http://localhost:3001/auth/webauthn/authenticate/options",
  signinUrl: "http://localhost:3001/auth/webauthn/authenticate",
  verifyUrl: "http://localhost:3001/auth/webauthn/verify",
});
