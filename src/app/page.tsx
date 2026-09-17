import { Hero } from "@/components/hero/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <PhilosophySection />
      <ContactSection />
    </>
  );
}
