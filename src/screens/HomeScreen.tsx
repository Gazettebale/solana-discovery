import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { currentIndex, handleSkip, handleExplore, handleReset, savedProjects } = useApp();
  const currentProject = projects[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Text style={styles.logo}>⚡ SolQuest</Text>
        <Text style={styles.counter}>{Math.min(currentIndex + 1, projects.length)}/{projects.length}</Text>
      </View>

      {currentProject ? (
        <>
          <ProjectCard project={currentProject} />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
              <Text style={styles.skipText}>✕ Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exploreBtn} onPress={handleExplore}>
              <Text style={styles.exploreText}>✓ Explore</Text>
            </TouchableOpacity>
          </View>
        </>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#2a1a2e',
    borderWidth: 1,
    borderColor: '#E94560',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  skipText: { color: '#E94560', fontSize: 18, fontWeight: 'bold' },
  exploreBtn: {
    flex: 1,
    backgroundColor: '#1a2e1a',
    borderWidth: 1,
    borderColor: '#6CBF6C',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  exploreText: { color: '#6CBF6C', fontSize: 18, fontWeight: 'bold' },
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