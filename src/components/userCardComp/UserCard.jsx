import React from "react";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";

function UserCard({ id, name, occupation, imageUrl, additionalInfo }) {
  return (
    <NavLink className={styles.card} to={`/admin/users/${id}`}>
      <div className={styles.imgBack}>
        <img src={imageUrl} alt={name} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.occupation}>{occupation}</p>
        <p className={styles.additionalInfo}>{additionalInfo}</p>
      </div>
    </NavLink>
  );
}

export default UserCard;
