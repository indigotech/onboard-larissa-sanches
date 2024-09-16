import React, { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from './mutations';
import Button from './components/Button';
import FormField from './components/FormField';
import H1 from './components/H1';

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface GraphQLError {
  name: string;
  message: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    const newErrors: ValidationErrors = {};

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      try {
        const { data } = await login({ variables: { email, password } });
        const token = data?.login?.token;

        if (token) {
          localStorage.setItem('authToken', token);
          setSuccessMessage('Login bem-sucedido!');
          setLoginError(null);
          navigate('/home');
        } else {
          setLoginError('Falha ao obter token de autenticação.');
        }
      } catch (err) {
        if (err instanceof ApolloError) {
          const graphqlErrors = err.graphQLErrors.map((error) => ({
            name: error.extensions?.code ?? 'Error',
            message: error.message ?? 'Erro inesperado',
          })) as GraphQLError[];

          if (graphqlErrors.length > 0) {
            setLoginError(graphqlErrors[0].message);
          }
        } else {
          setLoginError('Erro inesperado ao fazer login.');
        }
        setSuccessMessage(null);
      }
    }
  };

  return (
    <div>
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email:"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <FormField
          label="Senha:"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Enviar'}
        </Button>
        {loginError && <p style={{ color: 'red' }}>Erro: {loginError}</p>}
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
