const { dbConnection } = require('../dbConnection');

const TABLE_NAME = "tbl_116";

const questionnaireController = {
    async getQuestionnaire(req, res) {
        let connection;
        try {
            const { feedbackID } = req.params;
            connection = await dbConnection.createConnection();
            const [feedbackRows] = await connection.execute(`SELECT reverseParking, parallelParking, diagonalParking, mergingInTraffic, overtraking, oneWayStreet, towWayStreet, properTurning FROM ${TABLE_NAME}_feedback WHERE feedbackID = ?`, [feedbackID]);
            if (feedbackRows.length === 0) {
                console.log('Feedback not found');
                return res.status(404).send('Feedback not found');
            }
            const feedback = feedbackRows[0];
            const scores = [
                { topic: 'reverseParking', score: feedback.reverseParking },
                { topic: 'parallelParking', score: feedback.parallelParking },
                { topic: 'diagonalParking', score: feedback.diagonalParking },
                { topic: 'mergingInTraffic', score: feedback.mergingInTraffic },
                { topic: 'overtraking', score: feedback.overtraking },
                { topic: 'oneWayStreet', score: feedback.oneWayStreet },
                { topic: 'towWayStreet', score: feedback.towWayStreet },
                { topic: 'properTurning', score: feedback.properTurning }
            ];
            const lowestScores = scores.sort((a, b) => a.score - b.score).slice(0, 3);

            const questions = [];
            for (const score of lowestScores) {
                const [rows] = await connection.execute(`SELECT questionTopic, questionText, answer1, answer2, answer3, correctAnswer FROM ${TABLE_NAME}_questions WHERE questionTopic = ?`, [score.topic]);
                if (rows.length > 0) {
                    questions.push(rows[0]);
                }
            }
            res.json(questions);

        } catch (error) {
            console.error('Server error:', error);
            res.status(500).send('Server error');
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
};

module.exports = { questionnaireController };
