import { createContext, useContext, useState, ReactNode } from 'react';
import { Project, projects } from '../data/projects';

interface AppContextType {
  savedProjects: Project[];
  currentIndex: number;
  handleSkip: () => void;
  handleExplore: () => void;
  handleReset: () => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const handleSkip = () => setCurrentIndex((prev) => prev + 1);

  const handleExplore = () => {
    const project = projects[currentIndex];
    if (project && !savedIds.includes(project.id)) {
      setSavedIds((prev) => [...prev, project.id]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSavedIds([]);
  };

  const savedProjects = projects.filter((p) => savedIds.includes(p.id));

  return (
    <AppContext.Provider value={{ savedProjects, currentIndex, handleSkip, handleExplore, handleReset }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);