import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Project } from '../data/projects';

const { width } = Dimensions.get('window');

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <View style={[styles.card, { borderColor: project.color }]}>
      {project.isSeeker && (
        <View style={styles.seekerBadge}>
          <Text style={styles.seekerText}>📱 Seeker dApp Store</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.icon}>{project.icon}</Text>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: project.color + '33' }]}>
            <Text style={[styles.badgeText, { color: project.color }]}>{project.category}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#333' }]}>
            <Text style={styles.badgeText}>{project.difficulty}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.name}>{project.name}</Text>
      <Text style={styles.description}>{project.description}</Text>

      <View style={styles.rewardBox}>
        <Text style={styles.rewardLabel}>🎁 Reward</Text>
        <Text style={styles.rewardText}>{project.reward}</Text>
      </View>

      <View style={styles.swipeHint}>
        <Text style={styles.swipeLeft}>← Skip</Text>
        <Text style={styles.swipeRight}>Explore →</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    alignSelf: 'center',
  },
  seekerBadge: {
    backgroundColor: '#14F195' + '22',
    borderWidth: 1,
    borderColor: '#14F195',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  seekerText: { color: '#14F195', fontSize: 12, fontWeight: 'bold' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 48 },
  badges: { flexDirection: 'row', gap: 8 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  name: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  description: { color: '#aaa', fontSize: 15, lineHeight: 22, marginBottom: 20 },
  rewardBox: {
    backgroundColor: '#0f0f1a',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardLabel: { color: '#888', fontSize: 14 },
  rewardText: { color: '#9945FF', fontSize: 14, fontWeight: 'bold' },
  swipeHint: { flexDirection: 'row', justifyContent: 'space-between' },
  swipeLeft: { color: '#E94560', fontSize: 14 },
  swipeRight: { color: '#6CBF6C', fontSize: 14 },
});