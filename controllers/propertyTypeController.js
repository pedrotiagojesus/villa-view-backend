// Models
import PropertyTypeModel from "../models/propertyTypeModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/property_type.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    try {
        const PropertyType = await PropertyTypeModel.getAll();
        res.status(200).json(createApiResponse("success", PropertyType));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res) => {
    try {
        const newRecord = await PropertyTypeModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_type_id: newRecord.insertId,
                ...req.validatedData,
            })
        );
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyTypeModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await PropertyTypeModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                property_goal_id: id,
                ...req.validatedData,
            })
        );
    } catch (error) {
        next(error);
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Find record
        const record = await PropertyTypeModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        // TODO: Arranjar maneira de fazer um soft delete e um hard delete
        // TODO: Garantir que o primary key desta tabela não está em uso noutras tabelas

        await PropertyTypeModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await PropertyTypeModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await PropertyTypeModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
