import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const handleApprove = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.sectionHeader}>1. Information Collection</Text>
        <Text style={styles.paragraph}>
          The application may collect the following types of information:
          {"\n"}- Personal information: Name, email, phone number, ...
          {"\n"}- Financial information: Income, expenses, financial goals, and other data
          that users enter into the application.
          {"\n"}- Device information: Device type, operating system, IP address, and system
          log data to improve user experience.
          We only collect information that users provide directly or agree to
          through the application's features.
        </Text>
        <Text style={styles.sectionHeader}>2. Use of Information</Text>
        <Text style={styles.paragraph}>
          Your information will be used for the following purposes:
          {"\n"}- Managing and displaying personal financial information.
          {"\n"}- Improving application features and providing better services.
          {"\n"}- Sending notifications, updates, or customer support when needed.
          {"\n"}- Ensuring security and preventing fraudulent activities.
        </Text>
        <Text style={styles.sectionHeader}>3. Information Sharing</Text>
        <Text style={styles.paragraph}>
          We commit not to sell, rent, or share users' personal information with
          third parties, except:
          {"\n"}- When we have user consent.
          {"\n"}- When complying with legal requirements or requests from authorities.
          {"\n"}- When necessary to protect the legitimate rights of the application and users.
        </Text>
        <Text style={styles.sectionHeader}>4. Data Protection</Text>
        <Text style={styles.paragraph}>
          We implement technical and organizational measures to protect user data:
          {"\n"}- Data encryption: All sensitive data is encrypted during storage and
          transmission.
          {"\n"}- Authentication and access rights: Only authorized accounts can access
          information.
          {"\n"}- Backup: Data is regularly backed up to ensure recovery in emergency
          situations.
          {"\n"}- Server security: Application servers are protected by firewalls and
          advanced security measures.
        </Text>
        <Text style={styles.sectionHeader}>5. User Rights</Text>
        <Text style={styles.paragraph}>
          Users have the following rights:
          {"\n"}- Access and update their personal information.
          {"\n"}- Request data deletion when no longer using the application.
          {"\n"}- Withdraw consent for information processing activities.
          Users can contact the development team via email to exercise these rights.
        </Text>
        <Text style={styles.sectionHeader}>6. Policy Updates</Text>
        <Text style={styles.paragraph}>
          We may update this privacy policy to comply with changes in law or
          application features. Users will be notified of changes through the
          application or email (if provided).
        </Text>
        <Text style={styles.sectionHeader}>7. Contact</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this privacy policy, please contact us at:
          {"\n"}- Email: thongdiep2003@gmail.com
          {"\n"}- Phone: (+84) 039-296-3132
          Thank you for trusting and using our financial management application.
          We are committed to protecting your data and providing a secure experience.
          {"\n"}{"\n"}
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  approveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;