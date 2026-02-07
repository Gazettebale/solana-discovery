import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { projects } from '../data/projects';

export default function ProfileScreen() {
  const { savedProjects, currentIndex } = useApp();

  const seekerApps = savedProjects.filter((p) => p.isSeeker).length;
  const defiApps = savedProjects.filter((p) => ['DeFi', 'Staking'].includes(p.category)).length;
  const categories = [...new Set(savedProjects.map((p) => p.category))];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>⚡ SolQuest</Text>
      <Text style={styles.subtitle}>Your Solana Journey</Text>

      <View style={styles.walletBox}>
        <Text style={styles.walletIcon}>🔗</Text>
        <Text style={styles.walletTitle}>Wallet Not Connected</Text>
        <Text style={styles.walletSubtitle}>Coming soon — connect your Seeker wallet</Text>
      </View>

      <Text style={styles.sectionTitle}>📊 Your Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{savedProjects.length}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{currentIndex}</Text>
          <Text style={styles.statLabel}>Reviewed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{seekerApps}</Text>
          <Text style={styles.statLabel}>Seeker Apps</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{defiApps}</Text>
          <Text style={styles.statLabel}>DeFi</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🏷️ Categories Explored</Text>
      <View style={styles.tagsRow}>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <View key={cat} style={styles.tagBox}>
              <Text style={styles.tagText}>{cat}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Explore projects to see your categories</Text>
        )}
      </View>

      <View style={styles.progressBox}>
        <Text style={styles.progressTitle}>🚀 Discovery Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentIndex / projects.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentIndex}/{projects.length} projects reviewed</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60, paddingHorizontal: 20 },
  logo: { color: '#9945FF', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#666', fontSize: 16, marginTop: 4, marginBottom: 24 },
  walletBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    marginBottom: 28,
  },
  walletIcon: { fontSize: 32, marginBottom: 8 },
  walletTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  walletSubtitle: { color: '#666', fontSize: 13, marginTop: 4 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  statBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
  },
  statNumber: { color: '#9945FF', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 13, marginTop: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
  tagBox: {
    backgroundColor: '#9945FF' + '22',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: { color: '#9945FF', fontSize: 13, fontWeight: '600' },
  emptyText: { color: '#666', fontSize: 13 },
  progressBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  progressTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  progressBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9945FF',
    borderRadius: 4,
  },
  progressText: { color: '#888', fontSize: 13 },
});