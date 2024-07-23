const { dbConnection } = require("../dbConnection");

const TABLE_NAME = "tbl_116";

const simulationController = {
    async getSimulations(req, res) {
        let connection;
        try {
            const { user_id } = req.query;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT s.id, s.user_id, s.simulationName, s.attempts, DATE_FORMAT(s.perform, '%Y-%m-%d') AS perform, s.score, s.notes, s.video
                FROM ${TABLE_NAME}_simulations s
                INNER JOIN ${TABLE_NAME}_users u ON s.user_id = u.user_id
                WHERE s.user_id = ?`, [user_id]);
            res.json(rows);
        } catch (error) {
            console.error("Error in getSimulations:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async getSimulation(req, res) {
        let connection;
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT id, user_id, simulationName, attempts, DATE_FORMAT(perform, '%Y-%m-%d') AS perform, score, notes, video FROM ${TABLE_NAME}_simulations WHERE id = ? and user_id = ?`, [id, user_id]);

            if (rows.length > 0) {
                const simulation = rows[0];
                res.json(simulation);
            } else {
                res.status(404).json({ error: 'Simulation not found' });
            }
        } catch (error) {
            console.error("Error in getSimulation:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    async createSimulation(req, res) {
        let connection;
        try {
            connection = await dbConnection.createConnection();
            const [result] = await connection.execute(`INSERT INTO ${TABLE_NAME}_simulations (user_id ,simulationName,attempts,perform,score,notes,video) VALUES (?,?,?,?,?,?,?)`, [1, req.body.simulationName, req.body.simulationAttempts, req.body.simulationPerform, req.body.simulationScore, req.body.simulationDetails, req.body.simulationFile]);
            const [simulation] = await connection.execute(`SELECT id, user_id, simulationName, attempts, DATE_FORMAT(perform, '%Y-%m-%d') AS perform, score, notes, video FROM ${TABLE_NAME}_simulations WHERE id = ?`, [result.insertId]);
            res.json(simulation[0]);
        } catch (error) {
            console.error("Error in createSimulation:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async updateSimulation(req, res) {
        let connection;
        try {
            const { id } = req.params;
            const { user_id } = req.query;
            connection = await dbConnection.createConnection();
            await connection.execute(`UPDATE ${TABLE_NAME}_simulations SET user_id = ?, simulationName = ?, attempts = ?, perform = ?, score = ?, notes = ?, video = ? WHERE id = ?`, [user_id, req.body.simulationName, req.body.simulationAttempts, req.body.simulationPerform, req.body.simulationScore, req.body.simulationDetails, req.body.simulationFile, id]);
            const [simulation] = await connection.execute(`SELECT id, user_id, simulationName, attempts, DATE_FORMAT(perform, '%Y-%m-%d') AS perform, score, notes, video FROM ${TABLE_NAME}_simulations WHERE id = ?`, [id]);
            res.json(simulation[0]);
        } catch (error) {
            console.error("Error in updateSimulation:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    },
    async deleteSimulation(req, res) {
        let connection;
        try {
            const { id } = req.params;
            connection = await dbConnection.createConnection();
            const [rows] = await connection.execute(`SELECT simulationName FROM ${TABLE_NAME}_simulations WHERE id = ?`, [id]);
            if (rows.length === 0) {
                throw new Error('Simulation not found');
            }
            const simulationName = rows[0].simulationName;
            await connection.execute(`DELETE FROM ${TABLE_NAME}_simulations WHERE simulationName = ?`, [simulationName]);
            res.json({ message: "Simulation deleted" });
        } catch (error) {
            console.error("Error in deleteSimulation:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
};

module.exports = { simulationController };
