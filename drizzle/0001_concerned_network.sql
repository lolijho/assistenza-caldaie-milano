CREATE TABLE `blog_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`heroImage` varchar(500),
	`category` varchar(100) NOT NULL DEFAULT 'Guide',
	`readTime` varchar(50) NOT NULL DEFAULT '5 minuti',
	`published` int NOT NULL DEFAULT 1,
	`authorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `page_contents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` varchar(64) NOT NULL,
	`content` text NOT NULL,
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_contents_id` PRIMARY KEY(`id`),
	CONSTRAINT `page_contents_pageId_unique` UNIQUE(`pageId`)
);
--> statement-breakpoint
ALTER TABLE `blog_articles` ADD CONSTRAINT `blog_articles_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_contents` ADD CONSTRAINT `page_contents_updatedBy_users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;