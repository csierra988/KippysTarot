-- create "users" table
CREATE TABLE IF NOT EXISTS users (
    firebase_uid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRRENT_TIMESTAMP
);

-- create "readings" table
CREATE TABLE IF NOT EXISTS readings (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) NOT NULL,
    title VARCHAR(200) NOT NULL,
    card1 INT NOT NULL,
    card2 INT NOT NULL,
    card3 INT NOT NULL,
    journal_entry TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (firebase_uid) REFERENCES users(firebase_uid) ON DELETE CASCADE
);