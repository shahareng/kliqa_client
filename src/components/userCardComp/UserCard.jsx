import React from "react";
import styles from "./style.module.css";

function UserCard({ name, occupation, imageUrl, additionalInfo }) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.avatar} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.occupation}>{occupation}</p>
      <p className={styles.additionalInfo}>{additionalInfo}</p>
    </div>
  );
}

export default UserCard;
