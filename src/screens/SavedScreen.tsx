import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SavedScreen() {
  const { savedProjects } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(savedProjects.map(p => p.category))];
  const filtered = filter === 'All' ? savedProjects : savedProjects.filter(p => p.category === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Projects</Text>
      <Text style={styles.subtitle}>{savedProjects.length} projects saved</Text>

      {savedProjects.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📚</Text>
          <Text style={styles.emptyText}>No projects saved yet</Text>
          <Text style={styles.emptyHint}>Swipe right on Discover to save projects!</Text>
        </View>
      ) : (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setFilter(cat)}
                style={[styles.filterBtn, filter === cat && styles.filterBtnActive]}
              >
                <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {filtered.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={[styles.card, { borderLeftColor: project.color, borderLeftWidth: 3 }]}
                onPress={() => Linking.openURL(project.link)}
                activeOpacity={0.7}
              >
                <View style={styles.cardTop}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardIcon}>{project.icon}</Text>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardName}>{project.name}</Text>
                      <View style={styles.cardBadges}>
                        <Text style={[styles.cardCategory, { color: project.color }]}>{project.category}</Text>
                        {project.isSeeker && (
                          <Text style={styles.seekerTag}>Seeker</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.cardDesc} numberOfLines={2}>{project.description}</Text>
                <View style={styles.cardBottom}>
                  <Text style={styles.cardReward}>{project.reward}</Text>
                  <View style={[styles.openBtn, project.isSeeker ? styles.openBtnSeeker : styles.openBtnWeb]}>
                    <Text style={[styles.openBtnText, project.isSeeker ? styles.openBtnTextSeeker : styles.openBtnTextWeb]}>
                      {project.isSeeker ? 'Open App' : 'Visit Website'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ height: 100 }} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 },
  subtitle: { color: '#9945FF', fontSize: 14, paddingHorizontal: 20, marginTop: 4, marginBottom: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptyHint: { color: '#888', fontSize: 14, marginTop: 8 },
  filters: { paddingHorizontal: 16, marginBottom: 12, maxHeight: 36 },
  filterBtn: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  filterBtnActive: {
    backgroundColor: '#9945FF22',
    borderColor: '#9945FF',
  },
  filterText: { color: '#888', fontSize: 13 },
  filterTextActive: { color: '#9945FF', fontWeight: 'bold' },
  list: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cardIcon: { fontSize: 28, marginRight: 10 },
  cardInfo: { flex: 1 },
  cardName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cardBadges: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  cardCategory: { fontSize: 12, fontWeight: '600' },
  seekerTag: { color: '#14F195', fontSize: 10, fontWeight: 'bold', backgroundColor: '#14F19522', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  cardDesc: { color: '#888', fontSize: 13, lineHeight: 18, marginBottom: 10 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardReward: { color: '#9945FF', fontSize: 12, fontWeight: '600' },
  openBtn: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
  },
  openBtnSeeker: {
    backgroundColor: '#14F19515',
    borderColor: '#14F195',
  },
  openBtnWeb: {
    backgroundColor: '#9945FF15',
    borderColor: '#9945FF',
  },
  openBtnText: { fontSize: 11, fontWeight: 'bold' },
  openBtnTextSeeker: { color: '#14F195' },
  openBtnTextWeb: { color: '#9945FF' },
});
