import ConnectionModel from "../models/connectionModel.js";

export const connection = async (req, res) => {
    try {
        const status = await ConnectionModel.connection();
        res.status(200).json('Database connection is OK');
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('MySQL error:', error);
    }
};
