import { useEffect, useState } from "react"
import { useSocket } from "../lib/socketcontext"

const SignUp = () => {
  const socket = useSocket()
  const [email, setEmail] = useState('')

  const handleSignUp = async () => {
    if(email !== ''){
      socket.emit('auth-webauthn-register-options', {email})
  }}

    socket.on('auth-webauthn-register-options-response', async (data) => {
      try {
        console.log('data >>', data)
        // WebAuthn API를 사용하여 자격 증명 생성
        const credential = await navigator.credentials.create({
          publicKey: data
        });
        
        console.log('credential >>', credential)
    
        // 서버로 WebAuthn 자격 증명 전송
        socket.emit('auth-webauthn-register', {
          email: data.user.name,
          provider: 'builtin::local_webauthn',
          credentials: credential,
          verify_url: 'http://localhost:5173/auth/webauthn/verify',
          user_handle: new TextDecoder().decode(data.user.id),
        });
    
      } catch (error) {
        console.error('WebAuthn registration failed', error);
      }
      // socket.emit('register', registrationData);
    });

  


  return (
    <>
    <h1>회원가입</h1>
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={handleSignUp}>회원가입</button>

    </div>
    </>
  )
}

export default SignUp
