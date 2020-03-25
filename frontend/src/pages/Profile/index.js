import React, { useEffect, useState } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Profile() {
  const companyName = localStorage.getItem('companyName');
  const companyId = localStorage.getItem('companyId');
  const [getIncidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: companyId
        }
      })
      .then(response => {
        setIncidents(response.data);
        console.log(response.data);
      });
  }, [companyId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: companyId
        }
      });
      setIncidents(getIncidents.filter(incident => incident.Id !== id));
    } catch (err) {
      alert('Error during delete, try again later.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Welcome, {companyName}</span>

        <Link className='button' to='/incidents/new'>
          Create new incident
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='#E02041'></FiPower>
        </button>
      </header>

      <h1>Incidents</h1>
      <ul>
        {getIncidents.map(incident => (
          <li key={incident.Id}>
            <strong>INCIDENT:</strong>
            <p>{incident.Title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.Description}</p>

            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.Value)}</p>

            <button type='button' onClick={() => handleDeleteIncident(incident.Id)}>
              <FiTrash2 size={20} color='#a8a8b3'></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
