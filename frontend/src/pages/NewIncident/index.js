import React, { useState } from 'react';

import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const [getTitle, setTitle] = useState('');
  const [getDescription, setDescription] = useState('');
  const [getValue, setValue] = useState('');
  const history = useHistory();
  const companyId = localStorage.getItem('companyId');

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title: getTitle,
      description: getDescription,
      value: getValue
    };
    console.log(data);
    try {
      await api.post('incident', data, {
        headers: {
          Authorization: companyId
        }
      });
      history.push('/profile');
    } catch (err) {
      alert('Error when trying to save a new incident');
      console.log(err);
    }
  }

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />

          <h1>Create new incident</h1>
          <p>Create your incident to find heroes to help you</p>

          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder='Title' value={getTitle} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder='Description' value={getDescription} onChange={e => setDescription(e.target.value)} />
          <input placeholder='Value' value={getValue} onChange={e => setValue(e.target.value)} />
          <button className='button' type='submit'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
