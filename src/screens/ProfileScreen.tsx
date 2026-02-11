import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { projects } from '../data/projects';

export default function ProfileScreen() {
  const { savedProjects, currentIndex } = useApp();
  const reviewed = currentIndex;
  const total = projects.length;
  const seekerCount = savedProjects.filter(p => p.isSeeker).length;
  const categories = [...new Set(savedProjects.map(p => p.category))];
  const progress = Math.round((reviewed / total) * 100);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.walletBox}>
        <Text style={styles.walletEmoji}>🔗</Text>
        <Text style={styles.walletTitle}>Connect Wallet</Text>
        <Text style={styles.walletHint}>Link your Solana wallet to claim rewards</Text>
        <TouchableOpacity style={styles.walletBtn}>
          <Text style={styles.walletBtnText}>Connect</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{savedProjects.length}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{reviewed}</Text>
          <Text style={styles.statLabel}>Reviewed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#14F195' }]}>{seekerCount}</Text>
          <Text style={styles.statLabel}>Seeker Apps</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#FF9500' }]}>1</Text>
          <Text style={styles.statLabel}>GM Streak</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovery Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{reviewed}/{total} projects reviewed ({progress}%)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories Explored</Text>
        <View style={styles.tags}>
          {categories.length > 0 ? categories.map(cat => (
            <View key={cat} style={styles.tag}>
              <Text style={styles.tagText}>{cat}</Text>
            </View>
          )) : (
            <Text style={styles.emptyText}>Start swiping to explore categories!</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievements}>
          <View style={[styles.achievement, reviewed >= 1 && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>👀</Text>
            <Text style={styles.achieveText}>First Look</Text>
            <Text style={styles.achieveDesc}>Review 1 project</Text>
          </View>
          <View style={[styles.achievement, savedProjects.length >= 5 && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>⭐</Text>
            <Text style={styles.achieveText}>Collector</Text>
            <Text style={styles.achieveDesc}>Save 5 projects</Text>
          </View>
          <View style={[styles.achievement, seekerCount >= 5 && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>📱</Text>
            <Text style={styles.achieveText}>Seeker Fan</Text>
            <Text style={styles.achieveDesc}>Save 5 Seeker apps</Text>
          </View>
          <View style={[styles.achievement, reviewed >= total && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>🏆</Text>
            <Text style={styles.achieveText}>Explorer</Text>
            <Text style={styles.achieveDesc}>Review all projects</Text>
          </View>
          <View style={[styles.achievement, categories.length >= 5 && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>🌈</Text>
            <Text style={styles.achieveText}>Diverse</Text>
            <Text style={styles.achieveDesc}>Explore 5 categories</Text>
          </View>
          <View style={[styles.achievement, false && styles.achievementDone]}>
            <Text style={styles.achieveEmoji}>🔥</Text>
            <Text style={styles.achieveText}>Streak King</Text>
            <Text style={styles.achieveDesc}>7 day GM streak</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About SolQuest</Text>
        <View style={styles.aboutBox}>
          <Text style={styles.aboutText}>SolQuest helps you discover the best Solana dApps and earn rewards while exploring the ecosystem. Built for the Solana Seeker.</Text>
          <Text style={styles.version}>v1.0.0 - Hackathon Edition</Text>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 16 },
  walletBox: {
    marginHorizontal: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9945FF44',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  walletEmoji: { fontSize: 32, marginBottom: 8 },
  walletTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  walletHint: { color: '#888', fontSize: 12, marginBottom: 12, textAlign: 'center' },
  walletBtn: {
    backgroundColor: '#9945FF',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  walletBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    width: '48%',
    flexGrow: 1,
    alignItems: 'center',
  },
  statNumber: { color: '#9945FF', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: 12, marginTop: 4 },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  progressBar: {
    height: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9945FF',
    borderRadius: 4,
  },
  progressText: { color: '#888', fontSize: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: '#9945FF22',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  tagText: { color: '#9945FF', fontSize: 12, fontWeight: '600' },
  emptyText: { color: '#666', fontSize: 13 },
  achievements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievement: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    flexGrow: 1,
    opacity: 0.4,
  },
  achievementDone: {
    opacity: 1,
    borderWidth: 1,
    borderColor: '#9945FF',
  },
  achieveEmoji: { fontSize: 24, marginBottom: 4 },
  achieveText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  achieveDesc: { color: '#888', fontSize: 11, marginTop: 2 },
  aboutBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
  },
  aboutText: { color: '#888', fontSize: 13, lineHeight: 20 },
  version: { color: '#666', fontSize: 11, marginTop: 8 },
});
