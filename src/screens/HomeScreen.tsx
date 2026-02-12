import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import ProjectCard from '../components/ProjectCard';
import MiniGame from '../components/MiniGame';
import { projects } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { currentIndex, skipProject, saveProject, savedProjects } = useApp();
  const currentProject = projects[currentIndex];
  const streakSlide = useRef(new Animated.Value(-8)).current;
  const streakPulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(streakSlide, { toValue: 8, duration: 1200, useNativeDriver: false }),
          Animated.timing(streakPulse, { toValue: 1, duration: 1200, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.timing(streakSlide, { toValue: -8, duration: 1200, useNativeDriver: false }),
          Animated.timing(streakPulse, { toValue: 0.6, duration: 1200, useNativeDriver: false }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <Text style={styles.logo}>SolQuest</Text>
        <Animated.View style={[styles.streakBox, { transform: [{ translateX: streakSlide }], opacity: streakPulse }]}>
          <Text style={styles.streakText}>GM Streak: 1 day</Text>
        </Animated.View>
      </View>

      <View style={styles.subBar}>
        <Text style={styles.counter}>{Math.min(currentIndex + 1, projects.length)}/{projects.length} projects</Text>
        <Text style={styles.savedText}>{savedProjects.length} saved</Text>
      </View>

      {currentProject ? (
        <>
          <View style={styles.cardWrapper}>
            <ProjectCard
              key={currentProject.id}
              project={currentProject}
              onSwipeLeft={skipProject}
              onSwipeRight={() => saveProject(currentProject)}
            />
          </View>
          <MiniGame />
        </>
      ) : (
        <View style={styles.done}>
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneText}>You have seen all projects!</Text>
          <Text style={styles.savedCount}>{savedProjects.length} projects saved</Text>
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', paddingTop: 60 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  logo: { color: '#9945FF', fontSize: 24, fontWeight: 'bold' },
  streakBox: {
    backgroundColor: '#FF950022',
    borderWidth: 1,
    borderColor: '#FF9500',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: { color: '#FF9500', fontSize: 12, fontWeight: 'bold' },
  subBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  counter: { color: '#666', fontSize: 13 },
  savedText: { color: '#9945FF', fontSize: 13 },
  cardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  done: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  doneEmoji: { fontSize: 64, marginBottom: 16 },
  doneText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  savedCount: { color: '#9945FF', fontSize: 16, marginTop: 8 },
  bottomPadding: { height: 100 },
});