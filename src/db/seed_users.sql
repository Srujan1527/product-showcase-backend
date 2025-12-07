-- All passwords = "Password123"
-- bcrypt hash generated using 10 salt rounds
INSERT INTO
    users (name, email, password_hash, is_admin)
VALUES
    (
        'Aarav Mehta',
        'aarav.mehta@example.com',
        '$2a$10$NixhIPTUvi34uvHLHlhd0uVoFvFLE34b6uu/lNlwCgEUXFPmzHPWO',
        FALSE
    ),
    (
        'Meera Joshi',
        'meera.joshi@example.com',
        '$2a$10$NixhIPTUvi34uvHLHlhd0uVoFvFLE34b6uu/lNlwCgEUXFPmzHPWO',
        FALSE
    ),
    (
        'Srujan Pandikona',
        'srujanyadav95@gmail.com',
        '$2a$10$NixhIPTUvi34uvHLHlhd0uVoFvFLE34b6uu/lNlwCgEUXFPmzHPWO',
        TRUE
    ), -- admin
    (
        'Ananya Rao',
        'ananya.rao@example.com',
        '$2a$10$NixhIPTUvi34uvHLHlhd0uVoFvFLE34b6uu/lNlwCgEUXFPmzHPWO',
        FALSE
    ),
    (
        'Vikram Singh',
        'vikram.singh@example.com',
        '$2a$10$NixhIPTUvi34uvHLHlhd0uVoFvFLE34b6uu/lNlwCgEUXFPmzHPWO',
        TRUE
    );

-- admin