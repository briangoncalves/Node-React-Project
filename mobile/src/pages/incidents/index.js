import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {
  const navigation = useNavigation();
  const [getIncidents, setIncidents] = useState([]);
  const [getTotal, setTotal] = useState(0);
  const [getPage, setPage] = useState(1);
  const [getLoading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (getLoading) {
      return;
    }

    if (getTotal > 0 && getIncidents.length === getTotal) {
      return;
    }

    setLoading(true);

    const response = await api.get(`incident`, {
      params: { page: getPage }
    });

    setIncidents([...getIncidents, ...response.data]);
    setTotal(response.headers['x-total-count']);

    setLoading(false);
    setPage(getPage + 1);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total # of incidents: <Text style={styles.headerTextBold}>{getTotal} incidents</Text>
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>
        Choose one incident below and <Text style={styles.headerTextBold}>Be The Hero!</Text>
      </Text>

      <FlatList
        data={getIncidents}
        keyExtractor={incident => String(incident.Id)}
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>COMPANY:</Text>
            <Text style={styles.incidentValue}>{incident.Name}</Text>

            <Text style={styles.incidentProperty}>INCIDENT:</Text>
            <Text style={styles.incidentValue}>{incident.Title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.Value)}
            </Text>

            <TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailButtonText}>Details</Text>
              <Feather name='arrow-right' size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
