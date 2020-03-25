import React, { useState } from 'react';
import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {
  const [getName, setName] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getWhatsApp, setWhatsApp] = useState('');
  const [getCity, setCity] = useState('');
  const [getState, setState] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name: getName,
      email: getEmail,
      whatsapp: getWhatsApp,
      city: getCity,
      state: getState
    };

    try {
      const response = await api.post('/company', data);
      alert(`You Access Code is: ${response.data.code}`);
      history.push('/');
    } catch (err) {
      alert('Error trying to register, try again later');
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />

          <h1>Register</h1>
          <p>Create your account, get into the platform and help people find your incidents</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder='Company Name' value={getName} onChange={e => setName(e.target.value)} />
          <input type='email' placeholder='E-mail' value={getEmail} onChange={e => setEmail(e.target.value)} />
          <input placeholder='WhatsApp' value={getWhatsApp} onChange={e => setWhatsApp(e.target.value)} />
          <div className='input-group'>
            <input placeholder='City' value={getCity} onChange={e => setCity(e.target.value)} />
            <input placeholder='state' style={{ width: 80 }} value={getState} onChange={e => setState(e.target.value)} />
          </div>

          <button className='button' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
