import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SavedScreen() {
  const { savedProjects } = useApp();

  if (savedProjects.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>📭</Text>
        <Text style={styles.emptyTitle}>No saved projects yet</Text>
        <Text style={styles.emptySubtitle}>Swipe right on Discover to save projects here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📌 Saved Projects ({savedProjects.length})</Text>
      <FlatList
        data={savedProjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftColor: item.color }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.tags}>
                  <Text style={[styles.tag, { color: item.color }]}>{item.category}</Text>
                  {item.isSeeker && <Text style={styles.seekerTag}>📱 Seeker</Text>}
                </View>
              </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardLabel}>🎁</Text>
              <Text style={styles.rewardText}>{item.reward}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 16 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 32, marginRight: 12 },
  cardInfo: { flex: 1 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tags: { flexDirection: 'row', gap: 8, marginTop: 2 },
  tag: { fontSize: 12, fontWeight: '600' },
  seekerTag: { fontSize: 12, color: '#14F195', fontWeight: '600' },
  description: { color: '#888', fontSize: 13, lineHeight: 18, marginBottom: 8 },
  rewardRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rewardLabel: { fontSize: 14 },
  rewardText: { color: '#9945FF', fontSize: 13, fontWeight: 'bold' },
  empty: { flex: 1, backgroundColor: '#0f0f1a', alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  emptySubtitle: { color: '#666', fontSize: 14, marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
});