PRAGMA foreign_keys = ON;

/* List of security questions. */
CREATE TABLE IF NOT EXISTS `SEC_Q` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `question` VARCHAR(255)
);

/* Table of users. */
CREATE TABLE IF NOT EXISTS `USERS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(32) NOT NULL,
    `admin` INT NOT NULL DEFAULT 0,
    `active` INT NOT NULL DEFAULT 1,
    `lockout_count` INT DEFAULT 0,
    `sec_q1` INT NOT NULL,
    `sec_a1` VARCHAR(255) NOT NULL,
    `sec_q2` INT NOT NULL, 
    /* Need some way to enforce that sec_q1 != sec_q2. */
    `sec_a2` VARCHAR(255) NOT NULL,
    UNIQUE(`username`),
    FOREIGN KEY (`sec_q1`) REFERENCES `SEC_Q`(`id`),
    FOREIGN KEY (`sec_q2`) REFERENCES `SEC_Q`(`id`)
);

/* Table of past user password hashes. */
CREATE TABLE IF NOT EXISTS `PASSWORDS` (
    `id` INT AUTO_INCREMENT NOT NULL,
    `user_id` INT NOT NULL,
    `hash` CHAR(130) NOT NULL,
    `time_changed` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `USERS`(`id`)
);

/* Question categories (i.e., Geometry, Number Theory, etc.). */
CREATE TABLE IF NOT EXISTS `Q_CATS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(64)
);

/* Question levels (i.e., Elementary, High School, Undergraduate, Graduate, etc.). */
CREATE TABLE IF NOT EXISTS `Q_LEVELS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(64)
);

/* Table containing questions. */
CREATE TABLE IF NOT EXISTS `QUESTIONS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `author_id` INT NOT NULL,
    `q_id` INT NOT NULL,
    `q_rev_id` INT NOT NULL DEFAULT 0,
    `q_text` TEXT NOT NULL,
    `q_cat_id` INT NOT NULL,
    `q_level_id` INT NOT NULL,
    `post_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`author_id`) REFERENCES `USERS`(`id`),
    FOREIGN KEY (`q_cat_id`) REFERENCES `Q_CATS`(`id`),
    FOREIGN KEY (`q_level_id`) REFERENCES `Q_LEVELS`(`id`)
);

/* Table of question answers. */
CREATE TABLE IF NOT EXISTS `ANSWERS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `author_id` INT NOT NULL,
    `q_id` INT NOT NULL,
    `a_text` TEXT NOT NULL,
    `post_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`author_id`) REFERENCES `USERS`(`id`),
    FOREIGN KEY (`q_id`) REFERENCES `QUESTIONS`(`q_id`)
);

/* List of possible question tags (i.e., #homework, #power-series, #wave-equation, etc.). */
CREATE TABLE IF NOT EXISTS `TAGS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tag` VARCHAR(32)
);

/* Table to maintain association of what tags a question has. */
CREATE TABLE IF NOT EXISTS `Q_TAGS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `q_id` INT NOT NULL,
    `q_tag_id` INT NOT NULL,
    FOREIGN KEY (`q_id`) REFERENCES `QUESTIONS`(`id`),
    FOREIGN KEY (`q_tag_id`) REFERENCES `TAGS`(`id`)
);

/* Table for to facilitate URL shortening (for sharing link feature). */
CREATE TABLE IF NOT EXISTS `URLS` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `url_leaf` VARCHAR(10),
    `redirect_q_id` INT NOT NULL,
    `redirect_a_id` INT DEFAULT NULL
);