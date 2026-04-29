-- PostgreSQL (psql)
-- Se necessario, crie o banco antes de executar este arquivo:

-- Depois conecte no banco em psql: \c synaptix

CREATE DATABASE synaptix;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departamento (
    id_departamento INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome_departamento VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id_funcionario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_departamento INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_funcionarios_departamento
        FOREIGN KEY (id_departamento)
        REFERENCES departamento(id_departamento)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_funcionarios_departamento
    ON funcionarios (id_departamento);

CREATE TABLE IF NOT EXISTS cadastro_funcionarios (
    id_cadastro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_funcionario INTEGER NOT NULL UNIQUE,
    data_admissao DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_cadastro_funcionarios_funcionario
        FOREIGN KEY (id_funcionario)
        REFERENCES funcionarios(id_funcionario)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


