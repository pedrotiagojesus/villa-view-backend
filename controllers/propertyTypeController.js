import PropertyTypeModel from "../models/propertyTypeModel.js";
import { createApiResponse } from "../utils/response.js";

import dataList from "../data/property_type.json" assert { type: 'json' };

export const listRecords = async (req, res) => {
    try {
        const PropertyType = await PropertyTypeModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyType));
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

        const newRecord = await PropertyTypeModel.create(name);
        res.status(201).json(createApiResponse("success", {
            property_type_id: newRecord.insertId,
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
        const truncate = await PropertyTypeModel.truncate();
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
            await PropertyTypeModel.create(item.name);
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
