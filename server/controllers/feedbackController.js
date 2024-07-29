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
                WHERE f.userID = ? 
                ORDER BY grade ASC`, [user_id]);
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
            // const [rows] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_feedback WHERE id = ? and userID = ?`, [id, user_id]);
            const [rows] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_feedback WHERE feedbackID = ? and userID = ?`, [id, user_id]);
            
            if (rows.length > 0) {
                const feedback = rows[0];
                res.json(feedback);
            } else {
                res.status(404).json({ error: 'Feedback not found' });
            }
        } catch (error) {
            console.error("Error in getFeedback:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async updateFeedbackGrade(req, res) {
        let connection;
        try {
            const { id } = req.params;
            const feedback = req.body;
            if (!feedback) {
                return res.status(400).json({ error: 'Invalid request, Feedback content is empty' });
            }

            connection = await dbConnection.createConnection();

            const [existingFeedback] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_feedback WHERE feedbackID = ?`, [id]);
            if (existingFeedback.length === 0) {
                return res.status(404).json({ error: 'Feedback not found' });
            }

            // Update the feedback
            const [result] = await connection.execute(`UPDATE ${TABLE_NAME}_feedback SET grade = ? WHERE feedbackID = ?`, [feedback.grade, id]);

            if (result.affectedRows === 0) {
                return res.status(500).json({ error: 'Failed to update feedback' });
            }

            res.json({ message: 'Feedback updated successfully' });
        } catch (error) {
            console.error("Error in updateFeedbackGrade:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async createFeedback(req, res) {
        let connection;
        try {
            const { userId } = req.params;
            if (!req.body.lessonNumber || !req.body.lessonTopic || !req.body.reverseParking || !req.body.parallelParking || !req.body.diagonalParking || !req.body.mergingTraffic
                || !req.body.overtaking || !req.body.oneWayStreet || !req.body.twoWayStreet || !req.body.properTurning || !req.body.comments || !req.body.grade || !req.body.temperature || !req.body.weather) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            connection = await dbConnection.createConnection();
            const [result] = await connection.execute(`INSERT INTO ${TABLE_NAME}_feedback (userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments, grade, weather, temperature) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [userId, req.body.lessonNumber, req.body.lessonTopic, req.body.reverseParking, req.body.parallelParking, req.body.diagonalParking, req.body.mergingTraffic, req.body.overtaking, req.body.oneWayStreet, req.body.twoWayStreet, req.body.properTurning, req.body.comments, req.body.grade, req.body.weather, req.body.temperature]);

            const [feedback] = await connection.execute(`SELECT feedbackID, userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments, grade, weather, temperature FROM ${TABLE_NAME}_feedback WHERE feedbackID = ?`, [result.insertId]);
            res.json(feedback[0]);
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