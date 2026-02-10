import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { currentIndex, handleSkip, handleExplore, handleReset, savedProjects } = useApp();
  const currentProject = projects[currentIndex];
  const nextProject = projects[currentIndex + 1];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Text style={styles.logo}>⚡ SolQuest</Text>
        <Text style={styles.counter}>{Math.min(currentIndex + 1, projects.length)}/{projects.length}</Text>
      </View>

      {currentProject ? (
        <View style={styles.cardStack}>
          {nextProject && (
            <View style={styles.nextCard}>
              <View style={[styles.nextCardInner, { borderColor: nextProject.color }]}>
                <Text style={styles.nextIcon}>{nextProject.icon}</Text>
                <Text style={styles.nextName}>{nextProject.name}</Text>
                <Text style={styles.nextCategory}>{nextProject.category}</Text>
              </View>
            </View>
          )}
          <ProjectCard
            key={currentProject.id}
            project={currentProject}
            onSwipeLeft={handleSkip}
            onSwipeRight={handleExplore}
            isFirst={currentIndex === 0}
          />
        </View>
      ) : (
        <View style={styles.done}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneText}>You've seen all projects!</Text>
          <Text style={styles.savedCount}>{savedProjects.length} projects saved</Text>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: { color: '#9945FF', fontSize: 24, fontWeight: 'bold' },
  counter: { color: '#666', fontSize: 16 },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  nextCard: {
    position: 'absolute',
    top: 8,
    width: '95%',
    opacity: 0.5,
  },
  nextCardInner: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  nextIcon: { fontSize: 32 },
  nextName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  nextCategory: { color: '#888', fontSize: 13, marginTop: 4 },
  done: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  doneEmoji: { fontSize: 64, marginBottom: 16 },
  doneText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  savedCount: { color: '#9945FF', fontSize: 16, marginTop: 8 },
  resetBtn: {
    marginTop: 24,
    backgroundColor: '#9945FF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  resetText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});