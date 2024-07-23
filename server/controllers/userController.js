const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const userController = {
    async getUser(req, res) {
        let connection;
        try {
            const { id } = req.params;

            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT user_id FROM ${TABLE_NAME}_users WHERE user_id = ?`, [id]);

            if (rows.length > 0) {
                const user = rows[0];
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error("Error in getUser:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async getStudents(req, res) {
        let connection;
        try {
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT user_id, user_first_name, user_last_name FROM ${TABLE_NAME}_users WHERE user_type = 'student'`);
            res.json(rows);
        } catch (error) {
            console.error("Error in getStudents:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async login(req, res) {
        let connection;
        try {
            const { username, password } = req.body;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT user_id, user_type FROM ${TABLE_NAME}_users WHERE user_name = ? AND user_password = ?`, [username, password]);

            if (rows.length > 0) {
                const user = rows[0];
                res.json({ userId: user.user_id, userType: user.user_type });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        } finally {
            connection.end();
        }
    }
};

module.exports = { userController };