"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Registrar-se
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          Usuário criado<br />
          Agora você pode{' '}
          <Link className="underline" href={'/login'}>Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Um erro ocorreu<br />
          Tente outro email ou verifique sua senha
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="email" value={email}
               disabled={creatingUser}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="password" value={password}
               disabled={creatingUser}
                onChange={ev => setPassword(ev.target.value)}/>
        <button type="submit" disabled>
          Manutenção
        </button>
        <div className="my-4 text-center text-gray-500">
          ou faça login com o google
        </div>
        <button
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login com google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
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