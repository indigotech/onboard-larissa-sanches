import React, { useState } from 'react';

interface ValidationErrors {
  name?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  role?: string;
}

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const validRoles = ['ADMIN', 'USER'];
    if (!validRoles.includes(role)) {
      newErrors.role =
        'O cargo deve ser um dos seguintes: ADMINISTRADOR, USUÁRIO.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'O e-mail deve ser válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      setSuccessMessage('Usuário adicionado com sucesso!');
      setErrors({});
    }
  };

  return (
    <div>
      <h1>Adicionar Novo Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
          </label>
          {errors.name && (
            <p id="name-error" style={{ color: 'red' }}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label>
            Telefone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
            />
          </label>
          {errors.phone && (
            <p id="phone-error" style={{ color: 'red' }}>
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label>
            Data de Nascimento:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              min="1900-01-01"
              max={new Date().toISOString().split('T')[0]}
              aria-invalid={!!errors.birthDate}
              aria-describedby="birthDate-error"
            />
          </label>
          {errors.birthDate && (
            <p id="birthDate-error" style={{ color: 'red' }}>
              {errors.birthDate}
            </p>
          )}
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
          </label>
          {errors.email && (
            <p id="email-error" style={{ color: 'red' }}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label>
            Cargo:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              aria-invalid={!!errors.role}
              aria-describedby="role-error"
            >
              <option value="">Selecione um cargo</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuário</option>
            </select>
          </label>
          {errors.role && (
            <p id="role-error" style={{ color: 'red' }}>
              {errors.role}
            </p>
          )}
        </div>
        <button type="submit">Adicionar Usuário</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AddUser;
