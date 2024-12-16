import PropertyStatusModel from "../models/propertyStatusModel.js";
import { createApiResponse } from "../utils/response.js";

import dataList from "../data/property_status.json" assert { type: 'json' };

export const listRecords = async (req, res) => {
    try {
        const PropertyStatus = await PropertyStatusModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyStatus));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};


export const createRecord = async (req, res) => {
    try {
        const { name } = req.body;

        const newRecord = await PropertyStatusModel.create(name);
        res.status(201).json(createApiResponse("success", {
            property_status_id: newRecord.insertId,
            name,
        }));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await PropertyStatusModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await PropertyStatusModel.create(item.name);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        res.status(500).json(
            createApiResponse("error", null, {
                code: "DB_CONN_ERROR",
                message: error.message,
            })
        );
    }
};
