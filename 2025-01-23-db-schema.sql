CREATE TABLE `books`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `abstract` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
CREATE TABLE `reviews`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `book_id` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `vote` TINYINT NOT NULL,
    `text` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL
);
ALTER TABLE
    `reviews` ADD CONSTRAINT `reviews_book_id_foreign` FOREIGN KEY(`book_id`) REFERENCES `books`(`id`);