import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NightSwipe MVP</Text>
      <Text style={styles.subtext}>Phase 0 - Foundations Complete</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: 12,
  },
  subtext: {
    fontSize: 16,
    color: '#e5e7eb',
  },
});
