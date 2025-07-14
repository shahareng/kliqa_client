
import React, { useState, useEffect } from 'react';//import styles from "./style.module.css";

export default function EventCards({ title, date, location, imageUrl, description, isFocused }) {
  return (
    <div className={`event-card ${isFocused ? 'focused' : ''}`}>
      <img src={imageUrl} alt={title} className="event-image" />
      <h3 className="event-title">{title}</h3>
      <p className="event-date">{date}</p>
      <p className="event-location">{location}</p>
      {isFocused && <p className="event-description">{description}</p>}
    </div>
  );
}

// Network Background Component
function NetworkBackground() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  
  useEffect(() => {
    const generateNetwork = () => {
      const nodeCount = 35; // Reduced for less density
      const newNodes = [];
      
      // LinkedIn color palette
      const colors = ['#0a66c2', '#378fe9', '#54c7ec', '#70b5f9', '#004182'];
      
      // Create nodes scattered across the screen
      for (let i = 0; i < nodeCount; i++) {
        const size = Math.random() * 4 + 2; // Star-like sizes
        const x = Math.random() * 95 + 2.5; // Keep away from edges
        const y = Math.random() * 95 + 2.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.6 + 0.2;
        const animationDelay = Math.random() * 8;
        
        newNodes.push({
          id: i,
          x,
          y,
          size,
          color,
          opacity,
          animationDelay
        });
      }
      
      // Create dynamic connections with better logic
      const newConnections = [];
      for (let i = 0; i < newNodes.length; i++) {
        const node1 = newNodes[i];
        const nearbyNodes = [];
        
        // Find nearby nodes
        for (let j = 0; j < newNodes.length; j++) {
          if (i !== j) {
            const node2 = newNodes[j];
            const distance = Math.sqrt(
              Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
            );
            
            if (distance < 30) { // Connection threshold
              nearbyNodes.push({ node: node2, distance, index: j });
            }
          }
        }
        
        // Sort by distance and connect to 1-3 closest nodes
        nearbyNodes.sort((a, b) => a.distance - b.distance);
        const connectionsToMake = Math.min(
          Math.floor(Math.random() * 3) + 1,
          nearbyNodes.length
        );
        
        for (let k = 0; k < connectionsToMake; k++) {
          const targetNode = nearbyNodes[k];
          const connectionId = `${Math.min(i, targetNode.index)}-${Math.max(i, targetNode.index)}`;
          
          // Avoid duplicate connections
          if (!newConnections.find(conn => conn.id === connectionId)) {
            newConnections.push({
              id: connectionId,
              x1: node1.x,
              y1: node1.y,
              x2: targetNode.node.x,
              y2: targetNode.node.y,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: Math.random() * 10,
              length: targetNode.distance
            });
          }
        }
      }
      
      setNodes(newNodes);
      setConnections(newConnections);
    };
    
    generateNetwork();
  }, []);
  
  return (
    <div className="network-background">
      {/* SVG for connection lines */}
      <svg className="network-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a66c2" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#378fe9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#54c7ec" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {connections.map(conn => (
          <line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity={conn.opacity}
            className="connection-line"
            style={{ 
              animationDelay: `${conn.animationDelay}s`,
              strokeDasharray: `${conn.length / 2},${conn.length / 4}`
            }}
          />
        ))}
      </svg>
      
      {/* Star-like nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className="network-star"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            backgroundColor: node.color,
            opacity: node.opacity,
            animationDelay: `${node.animationDelay}s`,
            boxShadow: `0 0 ${node.size * 2}px ${node.color}40`
          }}
        />
      ))}
    </div>
  );
}
