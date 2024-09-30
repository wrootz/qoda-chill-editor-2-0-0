'use client';

import * as React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabase } from '../supabase/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (!error) {
      alert('Um e-mail foi enviado para redefinir sua senha.');
      router.push('/login');
    } else {
      alert('Erro ao enviar o e-mail: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Recuperação de Senha</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Recuperar Senha</button>
    </div>
  );
}
