import React, { useRef, useState, useEffect } from 'react';
import EventCards from '../../../components/eventComponents/EventsCards.jsx';
import styles from './style.module.css';

function Events() {
 const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(null);

  // ⬅️ כאן שמי את זה
  const events = Array(10).fill({
    title: "אירוע לדוגמה",
    date: "2025-08-01",
    location: "מיקום כלשהו",
    description: "תיאור ארוך של האירוע",
    imageUrl: "https://via.placeholder.com/150"
  });
    

  // תנועה אוטומטית
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const interval = setInterval(() => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1;
      }
    }, 15); // מהירות

    return () => clearInterval(interval);
  }, [isPaused]);

  // זיהוי כרטיס במרכז המסך
  const detectCenterCard = () => {
    const container = scrollRef.current;
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
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>אירועים קרובים</h1>
      <div
        className={styles.scrollContainer}
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
      </div>
    </div>
  );
}

export default Events;
