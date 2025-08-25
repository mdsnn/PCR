class UserQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """

    CREATE_USER = """
        INSERT INTO users (name, email, age) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, email, age, created_at, updated_at
    """

    GET_USER_BY_ID = """
        SELECT id, name, email, age, created_at, updated_at 
        FROM users 
        WHERE id = $1
    """

    GET_ALL_USERS = """
        SELECT id, name, email, age, created_at, updated_at 
        FROM users 
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    """

    UPDATE_USER = """
        UPDATE users 
        SET name = COALESCE($2, name),
            email = COALESCE($3, email),
            age = COALESCE($4, age),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, name, email, age, created_at, updated_at
    """

    DELETE_USER = """
        DELETE FROM users 
        WHERE id = $1
        RETURNING id
    """

    COUNT_USERS = "SELECT COUNT(*) FROM users"
