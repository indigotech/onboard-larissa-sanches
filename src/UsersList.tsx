import React from 'react';

interface User {
  name: string;
  email: string;
}

const fakeUsers: User[] = [
  { name: 'Larissa Sanches', email: 'larissa@example.com' },
  { name: 'João Silva', email: 'joao@example.com' },
  { name: 'Maria Sousa', email: 'maria@example.com' },
];

const UsersList: React.FC = () => {
  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {fakeUsers.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
