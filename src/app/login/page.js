'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    
    await signIn('credentials', {email, password})

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
               disabled={loginInProgress}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)}/>
        <button disabled type="submit">Manutenção</button>
        <div className="my-4 text-center text-gray-500">
          ou login com o google
        </div>
        <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login com google
        </button>
        <div class="flex flex-col items-center justify-center bg-gray-200 p-4 max-w-[50rem] rounded-lg mt-5">
          <h2 class="mb-4 text-blue-900 font-semibold ">Para fazer login como administrador faça login com a seguinte conta do google:</h2>
          <ul className="bg-gray-100 p-4 rounded-lg text-blue-900">
              <li><span className="font-semibold text-blue-900 mr-4">Email:</span>stfomeadm@gmail.com</li>
              <li><span className="font-semibold text-blue-900 mr-4">Senha:</span>stfomeadm</li>
          </ul>
      </div>
      </form>
      
    </section>
  );
}