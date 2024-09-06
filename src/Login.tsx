import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateFields = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Por favor, digite o seu email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor, digite um email válido.';
    }

    if (!password.trim()) {
      newErrors.password = 'Por favor, digite a sua senha.';
    } else if (password.length < 7) {
      newErrors.password = 'A senha deve ter pelo menos 7 caracteres.';
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      newErrors.password =
        'A senha deve conter pelo menos um dígito e uma letra.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <div>
      <h1>Bem-vindo(a) à Taqtile!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
