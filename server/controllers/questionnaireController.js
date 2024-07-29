const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const qustionnareController = {
    async getQuestionnaire(req, res) {
        let connection;
        try {
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_questionnaire`);
            res.json(rows);
        } catch (error) {
            console.error("Error in getQuestionnaire:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
};

module.exports = { qustionnareController };