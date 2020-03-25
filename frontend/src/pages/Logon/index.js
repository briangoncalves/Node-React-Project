import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [getCode, setCode] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { code: getCode });
      localStorage.setItem('companyId', response.data.id);
      localStorage.setItem('companyCode', getCode);
      localStorage.setItem('companyName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Login failed, try again later.');
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>
          <input placeholder='Your ID' value={getCode} onChange={e => setCode(e.target.value)}></input>
          <button className='button' type='submit'>
            Enter
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Register here
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  );
}
