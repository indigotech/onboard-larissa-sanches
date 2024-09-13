import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { USER_QUERY } from './queries';

interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<{ user: User }>(USER_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Carregando...</p>;

  if (error) {
    let errorMessage = 'Ocorreu um erro ao carregar os detalhes do usuário.';

    if (error.networkError) {
      errorMessage = 'Problema de rede. Verifique sua conexão com a internet.';
    } else if (error.graphQLErrors.length > 0) {
      errorMessage = 'Erro ao buscar dados. Tente novamente mais tarde.';
    }

    return <p style={{ color: 'red' }}>{errorMessage}</p>;
  }

  if (!data?.user) {
    return <p>Usuário não encontrado.</p>;
  }

  const { name, phone, birthDate, email, role } = data.user;

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      <p>
        <strong>Nome:</strong> {name}
      </p>
      <p>
        <strong>Telefone:</strong> {phone}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {birthDate}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Função:</strong> {role}
      </p>
      <button onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
};

export default UserDetails;
