import express from 'express';
const router = express.Router();
import { getWebAuthnOptions, postWebAuthnRegister } from './webauthn.js';

// GET /auth/webauthn/register/options
router.get('/webauthn/register/options', getWebAuthnOptions);

// POST /auth/webauthn/register
router.post('/webauthn/register', postWebAuthnRegister);

// module.exports = router;
export default router;