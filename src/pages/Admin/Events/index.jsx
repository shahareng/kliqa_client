import React, { useRef, useState, useEffect } from 'react';
import EventCards from '../../../components/eventComponents/EventsCards.jsx';
//import styles from './style.module.css';

function Events() {
 const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const events = Array(10).fill({
    title: "אירוע לדוגמה",
    date: "2025-08-01",
    location: "מיקום כלשהו",
    description: "תיאור ארוך של האירוע שמכיל מידע נוסף על הפעילות והמשתתפים",
    imageUrl: "https://via.placeholder.com/200x150"
  });

  // תנועה אוטומטית
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    const interval = setInterval(() => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1;
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isPaused]);

  // זיהוי כרטיס במרכז המסך
  const detectCenterCard = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    const children = Array.from(container.children);
    let bestIndex = null;
    let minDiff = Infinity;

    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const screenCenter = window.innerWidth / 2;
      const diff = Math.abs(centerX - screenCenter);

      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = index;
      }
    });

    setFocusedIndex(bestIndex);
  };

  useEffect(() => {
    detectCenterCard();
    window.addEventListener('resize', detectCenterCard);
    return () => window.removeEventListener('resize', detectCenterCard);
  }, []);

  return (
    <div className="events-wrapper">
      <NetworkBackground />
      <div className="events-content">
        <h1 className="page-title">אירועים קרובים</h1>
        <div className="scroll-container-wrapper">
          <div
            className="scroll-container"
            ref={scrollRef}
            onScroll={detectCenterCard}
          >
            {events.map((event, index) => (
              <div
                key={index}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <EventCards
                  {...event}
                  isFocused={focusedIndex === index}
                />
              </div>
            ))}
             </div> {/* scroll-container-wrapper */}
          </div>
        </div>
      </div>
  );
}

export default Events;
