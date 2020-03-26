import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import logoImg from '../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Hello ${incident.Name}, I am reaching you because I would like to help in the incident '${incident.Title}' with the value of ${incident.Value}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.Title}`,
      recipients: [incident.Email],
      body: message
    });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.WhatsApp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#E82041' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>COMPANY:</Text>
        <Text style={styles.incidentValue}>
          {incident.Name} - {incident.City} / {incident.State}
        </Text>

        <Text style={styles.incidentProperty}>INCIDENT:</Text>
        <Text style={styles.incidentValue}>{incident.Title}</Text>

        <Text style={styles.incidentProperty}>DESCRIPTION:</Text>
        <Text style={styles.incidentValue}>{incident.Description}</Text>

        <Text style={styles.incidentProperty}>VALUE:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.Value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the Day!</Text>
        <Text style={styles.heroTitle}>Be The Hero of this incident!</Text>
        <Text style={styles.heroDescription}>Get in touch:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
