import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USERS_QUERY } from './queries';

interface User {
  id: string;
  email: string;
  name: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loading, error, data, refetch } = useQuery(USERS_QUERY, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.users?.nodes) {
      setUsers(data.users.nodes);
    }
  }, [data]);

  const handleRetry = () => {
    refetch();
  };

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
    </div>
  );
};

export default UsersList;
