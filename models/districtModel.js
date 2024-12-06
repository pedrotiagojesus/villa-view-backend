import { connection } from "../config/mysql.js";

export default {
    getAll: async () => {
        const [result] = await connection.query("SELECT * FROM `district`");
        return result;
    },
    create: async (name) => {
        await connection.query("INSERT INTO `district` (name) VALUES (?)", [
            name,
        ]);
    },
    truncate: async () => {
        await connection.query("TRUNCATE TABLE `district`");
    },
};
