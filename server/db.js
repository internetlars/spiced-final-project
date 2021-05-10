const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
);

// function for adding user
module.exports.addUser = (firstName, lastName, email, hashedPassword) => {
    const q = `
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    const params = [firstName, lastName, email, hashedPassword];
    return db.query(q, params);
};

// function for retrieving user
module.exports.getUser = (email) => {
    const q = `
    SELECT * FROM users WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params);
};
