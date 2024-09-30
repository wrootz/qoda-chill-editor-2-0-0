'use client';

import * as React from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { supabase } from '../supabase/supabaseClient';


export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      alert('Cadastro realizado com sucesso! Verifique seu e-mail.');
      router.push('/login');
    } else {
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  return (
    <div>
        <h1>Cadastro</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignUp}>Cadastrar</button>
        <p>
        Já tem uma conta? <Link href="/login">Faça login aqui</Link>
        </p>
    </div>
  );
}
