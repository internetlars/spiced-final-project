const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
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

// check verification code
module.exports.checkVerificationCode = (email) => {
    const q = `
    SELECT * FROM reset_codes
    WHERE email = $1 AND 
    CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    `;
    const params = [email];
    return db.query(q, params);
};

//insert code into new table (reset_codes)
module.exports.insertCode = (code, email) => {
    const q = `
    INSERT INTO reset_codes (code, email)
    VALUES ($1, $2)
    RETURNING *
    `;
    const params = [code, email];

    return db.query(q, params);
};

//update password of user's table my email
module.exports.updatePassword = (hashedPassword, email) => {
    const q = `
    UPDATE users SET hashedPassword = $1 WHERE email = $2 RETURNING *,
    
    `;
    const params = [hashedPassword, email];
    return db.query(q, params);
};

module.exports.uploadProfilePic = (fullUrl, userId) => {
    const q = `
    UPDATE users SET img_url = $1
    WHERE id = $2
    RETURNING *
    `;
    const params = [fullUrl, userId];
    return db.query(q, params);
};

module.exports.getUserInfo = (userId) => {
    const q = `
    SELECT * FROM users WHERE id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.setBio = (bio, userId) => {
    const q = `
    UPDATE users
    SET bio = $1
    WHERE id = $2
    RETURNING *
    `;
    const params = [bio, userId];
    return db.query(q, params);
};
