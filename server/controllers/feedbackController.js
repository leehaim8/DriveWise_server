const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const feedbackController = {
    async createFeedback(req, res) {
        let connection;
        try {
            const { userId } = req.params;
            if (!req.body.lessonNumber || !req.body.lessonTopic || !req.body.reverseParking || !req.body.parallelParking || !req.body.diagonalParking || !req.body.mergingTraffic
                || !req.body.overtaking || !req.body.oneWayStreet || !req.body.twoWayStreet || !req.body.properTurning || !req.body.comments) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }
            connection = await dbConnection.createConnection();
            const [result] = await connection.execute(`INSERT INTO ${TABLE_NAME}_feedback (userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                [userId, req.body.lessonNumber, req.body.lessonTopic, req.body.reverseParking, req.body.parallelParking, req.body.diagonalParking, req.body.mergingTraffic, req.body.overtaking, req.body.oneWayStreet, req.body.twoWayStreet, req.body.properTurning, req.body.comments]);

            const [feedback] = await connection.execute(`SELECT feedbackID, userID, lessonNumber, lessonTopic, reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning, comments FROM ${TABLE_NAME}_feedback WHERE feedbackID = ?`, [result.insertId]);
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