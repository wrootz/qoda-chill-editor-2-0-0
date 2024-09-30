'use client';

import * as React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation'; // Altere para esta importação
import Link from 'next/link';

import { supabase } from '../supabase/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push('/editor');
    } else {
      alert('Acesso negado!!!');
    }
  };

  return (
    <div>
        <div>
          <h1>Login</h1>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>
            Não tem uma conta? <Link href="/signup">Cadastre-se aqui</Link>
          </p>
          <p>
            <Link href="/forgot">Esqueceu sua senha?</Link>
          </p>
        </div>
    </div>

  );
}
