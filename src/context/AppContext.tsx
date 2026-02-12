import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project } from '../data/projects';

interface AppContextType {
  savedProjects: Project[];
  currentIndex: number;
  saveProject: (project: Project) => void;
  skipProject: () => void;
  gmStreak: number;
  xp: number;
  addXP: (amount: number) => void;
  resetCards: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gmStreak, setGmStreak] = useState(1);
  const [xp, setXp] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('savedProjects');
        const indexData = await AsyncStorage.getItem('currentIndex');
        const xpData = await AsyncStorage.getItem('xp');
        const streakData = await AsyncStorage.getItem('gmStreak');

        if (savedData) setSavedProjects(JSON.parse(savedData));
        if (indexData) setCurrentIndex(JSON.parse(indexData));
        if (xpData) setXp(JSON.parse(xpData));
        if (streakData) setGmStreak(JSON.parse(streakData));
      } catch (e) {
        console.log('Error loading data', e);
      }
      setLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('savedProjects', JSON.stringify(savedProjects));
  }, [savedProjects, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }, [currentIndex, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('xp', JSON.stringify(xp));
  }, [xp, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem('gmStreak', JSON.stringify(gmStreak));
  }, [gmStreak, loaded]);

  const saveProject = (project: Project) => {
    setSavedProjects(prev => [...prev, project]);
    setCurrentIndex(prev => prev + 1);
  };

  const skipProject = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const resetCards = async () => {
    setCurrentIndex(0);
    setSavedProjects([]);
    await AsyncStorage.setItem('currentIndex', '0');
    await AsyncStorage.setItem('savedProjects', '[]');
  };

  if (!loaded) return null;

  return (
    <AppContext.Provider value={{ savedProjects, currentIndex, saveProject, skipProject, gmStreak, xp, addXP, resetCards }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);