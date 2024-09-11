import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from './queries';

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

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const { loading, error, data, refetch } = useQuery<UsersData>(USERS_QUERY, {
    variables: {
      data: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      } as PageInput,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.users) {
      setUsers(data.users.nodes);
    }
  }, [data]);

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
      <div>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <button onClick={handleRetry}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))
        ) : (
          <p>Não há usuários para exibir.</p>
        )}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Anterior
        </button>
        <span>
          {' '}
          {page} de {totalPages} páginas{' '}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!data?.users?.pageInfo.hasNextPage}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default UsersList;
