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


class ProductQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """

    CREATE_PRODUCT = """
        INSERT INTO products (name, price)
        VALUES ($1, $2)
        RETURNING id, name, price, created_at
    """

    GET_PRODUCT_BY_ID = "SELECT * FROM products WHERE id = $1"
    GET_ALL_PRODUCTS = "SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2"
    DELETE_PRODUCT = "DELETE FROM products WHERE id = $1 RETURNING id"

class OrderQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            quantity INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """

    CREATE_ORDER = """
        INSERT INTO orders (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, product_id, quantity, created_at
    """

    GET_ORDER_BY_ID = """
        SELECT o.id, o.user_id, u.name AS user_name,
               o.product_id, p.name AS product_name, p.price,
               o.quantity, o.created_at
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN products p ON o.product_id = p.id
        WHERE o.id = $1
    """

    GET_ALL_ORDERS = """
        SELECT o.id, u.name AS user_name, p.name AS product_name, o.quantity, o.created_at
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN products p ON o.product_id = p.id
        ORDER BY o.created_at DESC
        LIMIT $1 OFFSET $2
    """
