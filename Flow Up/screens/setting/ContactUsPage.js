import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';

const ContactUsScreen = () => {
  const contacts = [
    {
      name: 'Điệp Nguyễn',
      facebook: 'https://www.facebook.com/profile.php?id=100022075092822',
      email: 'thongdiep2003@gmail.com',
      github: 'https://github.com/ThongDiep2003',
      image: require('../../assets/fb1.png'), 
    },
    {
      name: 'Thái Sơn',
      facebook: 'https://www.facebook.com/signorconiglio03',
      email: 'thaison123456xyz@gmail.com',
      github: 'https://github.com/Bisoo12300',
      image: require('../../assets/fb2.png'), 
    },
  ];

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>You can contact us by:</Text>
      <View style={styles.columns}>
        {contacts.map((contact, index) => (
          <View key={index} style={styles.column}>
            <Image source={contact.image} style={styles.image} />
            <Text style={styles.memberName}>{contact.name}</Text>
            <TouchableOpacity
              style={styles.row}
              onPress={() => openLink(contact.facebook)}
            >
              <Text style={styles.link}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => openLink(`mailto:${contact.email}`)}
            >
              <Text style={styles.link}>Gmail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() => openLink(contact.github)}
            >
              <Text style={styles.link}>GitHub</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => openLink('https://facebook.com')}>
          <Image
            source={require('../../assets/facebook-logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('mailto:')}>
          <Image
            source={require('../../assets/gmail-logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://github.com')}>
          <Image
            source={require('../../assets/github-logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#555',
  },
  row: {
    marginBottom: 15,
  },
  link: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
    
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default ContactUsScreen;
