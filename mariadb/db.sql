create database if not exists allahsoft;

use allahsoft;

create table if not exists users (
    `id`            int unsigned auto_increment,
    `name`          varchar(255) not null,
    `email`         varchar(255) not null,
    `password`      varchar(255) not null,
    `created_at`    timestamp not null default CURRENT_TIMESTAMP(),
    constraint `users_pk`
        primary key (`id`)
);