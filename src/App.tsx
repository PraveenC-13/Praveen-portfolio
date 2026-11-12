import React from 'react';
import { EditorialHeader } from './components/EditorialHeader';
import { EditorialHero } from './components/EditorialHero';
import { EditorialAbout } from './components/EditorialAbout';
import { EditorialProjects } from './components/EditorialProjects';
import { EditorialTechnical } from './components/EditorialTechnical';
import { EditorialContact } from './components/EditorialContact';

export function App() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#292825] text-[#E9E2D5] min-h-screen selection:bg-[#C8B69D] selection:text-[#292825]">
      {/* Christopher Nolan / Vintage Dune Film Grain & Vignette */}
      <div className="cinema-grain" />
      <div className="sepia-vignette" />

      {/* Editorial Header Navigation */}
      <EditorialHeader onNavigate={scrollTo} />

      {/* Main Editorial Chapters */}
      <main>
        <EditorialHero
          onExploreWork={() => scrollTo('projects')}
          onAbout={() => scrollTo('about')}
          onContact={() => scrollTo('contact')}
        />

        <EditorialAbout />

        <EditorialProjects />

        <EditorialTechnical />

        <EditorialContact />
      </main>
    </div>
  );
}

export default App;
