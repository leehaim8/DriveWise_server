const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const feedbackController = {
    async getFeedbacks(req, res) {
        let connection;
        try {
            const { user_id } = req.query;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT *
                FROM ${TABLE_NAME}_feedback f
                INNER JOIN ${TABLE_NAME}_users u ON f.userID = u.user_id
                WHERE f.userID = ?`, [user_id]);
            res.json(rows);
        } catch (error) {
            console.error("Error in getFeedbacks:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async getFeedback(req, res) {
        let connection;
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_feedback WHERE id = ? and userID = ?`, [id, user_id]);

            if (rows.length > 0) {
                const feedback = rows[0];
                res.json(feedback);
            } else {
                res.status(404).json({ error: 'Feedback not found' });
            }
        } catch (error) {
            console.error("Error in getFeedback:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async createFeedback(req, res) {
        let connection;
        try {
            const { userId } = req.params;
            if (!req.body.lessonNumber || !req.body.lessonTopic || !req.body.reverseParking || !req.body.parallelParking || !req.body.diagonalParking || !req.body.mergingTraffic
                || !req.body.overtaking || !req.body.oneWayStreet || !req.body.twoWayStreet || !req.body.properTurning || !req.body.comments || !req.body.grade) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            connection = await dbConnection.createConnection();
            const [result] = await connection.execute(`INSERT INTO ${TABLE_NAME}_feedback (userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments, grade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [userId, req.body.lessonNumber, req.body.lessonTopic, req.body.reverseParking, req.body.parallelParking, req.body.diagonalParking, req.body.mergingTraffic, req.body.overtaking, req.body.oneWayStreet, req.body.twoWayStreet, req.body.properTurning, req.body.comments, req.body.grade]);

            const [feedback] = await connection.execute(`SELECT feedbackID, userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments, grade FROM ${TABLE_NAME}_feedback WHERE feedbackID = ?`, [result.insertId]);
            res.json(feedback[0]);
            console.log("feedback:", feedback);
        } catch (error) {
            console.error("Error in createFeedback:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
};

module.exports = { feedbackController };