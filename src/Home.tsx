import React from 'react';
import UsersList from './UsersList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo(a) à Página Inicial!</h1>
      <UsersList />
    </div>
  );
};

export default Home;
