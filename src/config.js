module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/budget-buddy-capstone-server',
    API_BASE_URL: 'https://budget-buddy-capstone-server.herokuapp.com/',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}