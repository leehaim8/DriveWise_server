const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const feedbackController = {
    async getFeedbacks(req, res) {
        let connection;
        try {
            const { user_id } = req.query;
            if (!user_id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT * FROM ${TABLE_NAME}_feedback f INNER JOIN ${TABLE_NAME}_users u ON f.userID = u.user_id WHERE f.userID = ?`, [user_id]);
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
            if (!user_id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            connection = await dbConnection.createConnection();
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
    },
    async updateFeedback(req, res) {
        let connection;
        try {
            const { feedbackID, questionTopic } = req.params;
            const { score } = req.body;
            if (!score) {
                res.status(400).json({ message: "Score is required" });
                return;
            }
            connection = await dbConnection.createConnection();
            const [result] = await connection.execute(`UPDATE ${TABLE_NAME}_feedback SET ${questionTopic} = ?, grade = grade + 5 WHERE feedbackID = ? and (grade + 5) <= 100`, [score, feedbackID]);

            if (result.affectedRows === 0) {
                return res.status(404).send('Feedback or topic not found');
            }

            res.json({ message: 'Feedback score updated successfully' });

        } catch (error) {
            console.error('Error updating feedback score:', error);
            res.status(500).send('Server error');
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

};

module.exports = { feedbackController };