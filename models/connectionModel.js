import { connection } from "../config/mysql.js";

export default {
    connection: async () => {

        const [result] = await connection.query('SELECT 1');
        return result;
    },
};
