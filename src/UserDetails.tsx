import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { USER_QUERY } from './queries';
import Button from './components/Button';
import H1 from './components/H1';
import styled from 'styled-components';

interface User {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}

const DetailsContainer = styled.div`
  padding: 16px;
`;

const DetailItem = styled.p`
  font-size: 16px;
  margin: 8px 0;
`;

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
    <DetailsContainer>
      <H1>Detalhes do Usuário</H1>
      <DetailItem>
        <strong>Nome:</strong> {name}
      </DetailItem>
      <DetailItem>
        <strong>Telefone:</strong> {phone}
      </DetailItem>
      <DetailItem>
        <strong>Data de Nascimento:</strong> {birthDate}
      </DetailItem>
      <DetailItem>
        <strong>Email:</strong> {email}
      </DetailItem>
      <DetailItem>
        <strong>Função:</strong> {role}
      </DetailItem>
      <Button onClick={() => window.history.back()}>Voltar</Button>
    </DetailsContainer>
  );
};

export default UserDetails;
