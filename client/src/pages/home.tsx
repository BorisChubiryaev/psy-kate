import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Approach from "@/components/sections/approach";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    const links = document.querySelectorAll('a[href^="#"]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      const targetSection = targetId ? document.querySelector(targetId) : null;
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    links.forEach(link => {
      link.addEventListener('click', handleClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);
    
    // Observe glass elements for animation
    document.querySelectorAll('.glass, .glass-dark, .liquid-gradient, .liquid-gradient-dark').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scroll-smooth min-h-screen bg-background">
      {/* Liquid glass background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-200 opacity-10 blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="section-divider my-16 mx-auto max-w-4xl"></div>
        <About />
        <div className="section-divider my-16 mx-auto max-w-4xl"></div>
        <Services />
        <div className="section-divider my-16 mx-auto max-w-4xl"></div>
        <Approach />
        <div className="section-divider my-16 mx-auto max-w-4xl"></div>
        <Contact />
        <Footer />
      </div>
    </div>
  );
}