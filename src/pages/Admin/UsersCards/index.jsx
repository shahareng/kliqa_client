// src/pages/Admin/UsersCards/index.jsx
import styles from "./style.module.css";

const img = "https://randomuser.me/api/portraits/men/32.jpg";

const users = [
  {
    name: "John Doe",
    occupation: "Full Stack Developer",
    imageUrl: img,
    additionalInfo: "Experienced in building scalable web apps."
  },
  {
    name: "Dan Cohen",
    occupation: "Product Manager",
    imageUrl: img,
    additionalInfo: "Leads cross-functional teams and drives strategy."
  },
  {
    name: "Sara Levi",
    occupation: "UX Designer",
    imageUrl: img,
    additionalInfo: "Specializes in user research and prototyping."
  },
  {
    name: "Michael Rosenberg",
    occupation: "Data Scientist",
    imageUrl: img,
    additionalInfo: "Focus on machine learning and predictive analytics."
  },
  {
    name: "Rachel Green",
    occupation: "Marketing Manager",
    imageUrl: img,
    additionalInfo: "Expert in digital campaigns and SEO."
  },
  {
    name: "David Kim",
    occupation: "DevOps Engineer",
    imageUrl: img,
    additionalInfo: "Automates deployments and optimizes infrastructure."
  }
];

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

function mapAllUsers() {
  return users.map((user, idx) => (
    <UserCard
      key={idx}
      name={user.name}
      occupation={user.occupation}
      imageUrl={user.imageUrl}
      additionalInfo={user.additionalInfo}
    />
  ));
}

function UsersCards() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Professional Network</h1>
      <div className={styles.grid}>{mapAllUsers()}</div>
    </div>
  );
}

export default UsersCards;
