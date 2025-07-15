import React from "react";
import styles from "./style.module.css";

function UserCard({ name, occupation, imageUrl, additionalInfo }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgBack}>
        <img src={imageUrl} alt={name} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.occupation}>{occupation}</p>
        <p className={styles.additionalInfo}>{additionalInfo}</p>
      </div>
    </div>
  );
}

export default UserCard;
