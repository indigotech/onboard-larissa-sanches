import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from './queries';
import { useNavigate } from 'react-router-dom';
import H1 from './components/H1';
import Button from './components/Button';
import styled from 'styled-components';

interface User {
  id: string;
  email: string;
  name: string;
}

interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UsersData {
  users: {
    nodes: User[];
    pageInfo: PageInfo;
    count: number;
  };
}

interface PageInput {
  offset: number;
  limit: number;
}

const Container = styled.div`
  padding: 16px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserListItem = styled.li`
  padding: 12px 0;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }

  &:active {
    color: #0056b3;
  }
`;

const PaginationContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ddd' : '#007bff')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ddd' : '#0056b3')};
  }
`;

const ErrorText = styled.p`
  color: red;
`;

const UsersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { loading, error, data, refetch } = useQuery<UsersData>(USERS_QUERY, {
    variables: {
      data: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      } as PageInput,
    },
    fetchPolicy: 'network-only',
  });

  const navigate = useNavigate();

  const handleRetry = () => {
    refetch();
  };

  const handleNextPage = () => {
    if (data?.users?.pageInfo.hasNextPage) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalPages = Math.ceil((data?.users?.count || 0) / pageSize);

  if (loading) return <p>Carregando...</p>;

  if (error) {
    let errorMessage = 'Ocorreu um erro ao carregar a lista de usuários.';

    if (error.networkError) {
      errorMessage = 'Problema de rede. Verifique sua conexão com a internet.';
    } else if (error.graphQLErrors.length > 0) {
      errorMessage = 'Erro ao buscar dados. Tente novamente mais tarde.';
    }

    return (
      <Container>
        <ErrorText>{errorMessage}</ErrorText>
        <Button onClick={handleRetry}>Tentar Novamente</Button>
      </Container>
    );
  }

  return (
    <Container>
      <H1>Lista de Usuários</H1>
      <UserList>
        {data?.users?.nodes.length ? (
          data.users.nodes.map((user) => (
            <UserListItem key={user.id}>
              <a
                href={`/user/${user.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>{user.name}</strong> - {user.email}
              </a>
            </UserListItem>
          ))
        ) : (
          <p>Não há usuários para exibir.</p>
        )}
      </UserList>
      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
          Anterior
        </PaginationButton>
        <span>
          {' '}
          {page} de {totalPages} páginas{' '}
        </span>
        <PaginationButton
          onClick={handleNextPage}
          disabled={!data?.users?.pageInfo.hasNextPage}
        >
          Próxima
        </PaginationButton>
      </PaginationContainer>
      <Button onClick={() => navigate('/add-user')}>Adicionar Usuário</Button>
    </Container>
  );
};

export default UsersList;
