import React, { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { CREATE_USER_MUTATION } from './mutations';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button';
import H1 from './components/H1';
import FormField from './components/FormField';

const MAX_BIRTH_DATE = new Date().toISOString().split('T')[0];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidationErrors {
  name?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  role?: string;
  password?: string;
  server?: string;
}

interface GraphQLError {
  name: string;
  message: string;
}

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [addUser, { loading }] = useMutation(CREATE_USER_MUTATION);
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    const newErrors: ValidationErrors = {};

    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2 || nameParts.some((part) => part.length === 0)) {
      newErrors.name = 'O nome deve conter pelo menos 2 palavras distintas.';
    }

    if (!/^\d{10,11}$/.test(phone)) {
      newErrors.phone =
        'O telefone deve conter apenas dígitos e ter 10 ou 11 dígitos.';
    }

    const today = new Date();
    const birth = new Date(birthDate);
    if (!birthDate || birth > today) {
      newErrors.birthDate = 'A data de nascimento não pode ser no futuro.';
    }

    const validRoles = ['admin', 'user'];
    if (!validRoles.includes(role.toLowerCase())) {
      newErrors.role = 'O cargo deve ser um dos seguintes: admin, user.';
    }

    if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'O e-mail deve ser válido.';
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
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
        await addUser({
          variables: {
            data: {
              name,
              phone,
              birthDate,
              email,
              password,
              role,
            },
          },
        });
        setSuccessMessage('Usuário adicionado com sucesso!');
        setErrors({});
        navigate('/home');
      } catch (err) {
        console.error('Error details:', err);

        if (err instanceof ApolloError) {
          const graphqlErrors = err.graphQLErrors.map((error) => ({
            name: error.extensions?.code ?? 'Error',
            message: error.message ?? 'Erro inesperado',
          })) as GraphQLError[];

          if (graphqlErrors.length > 0) {
            setErrors({ server: graphqlErrors[0].message });
          } else {
            setErrors({ server: 'Erro inesperado ao adicionar usuário.' });
          }
        } else {
          setErrors({
            server: 'Erro desconhecido. Tente novamente mais tarde.',
          });
        }
        setSuccessMessage(null);
      }
    }
  };

  return (
    <div>
      <H1>Adicionar Novo Usuário</H1>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <FormField
          label="Telefone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
        />
        <FormField
          label="Data de Nascimento"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          error={errors.birthDate}
          min="1900-01-01"
          max={MAX_BIRTH_DATE}
        />
        <FormField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <FormField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <FormField
          label="Cargo"
          type="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={errors.role}
          options={[
            { value: '', label: 'Selecione um cargo' },
            { value: 'admin', label: 'Administrador' },
            { value: 'user', label: 'Usuário' },
          ]}
        />
        <Button type="submit" loading={loading}>
          Adicionar Usuário
        </Button>
      </form>
      {errors.server && <p style={{ color: 'red' }}>Erro: {errors.server}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddUser;
