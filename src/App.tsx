import React from 'react';
import { PasswordGate } from './components/PasswordGate';
import ProjectEvolutionPage from './modules/project-evolution/pages/ProjectEvolutionPage';

const App: React.FC = () => {
  return (
    <PasswordGate>
      <ProjectEvolutionPage />
    </PasswordGate>
  );
};

export default App;
