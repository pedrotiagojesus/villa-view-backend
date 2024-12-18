// Models
import DistrictModel from "../models/districtModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/distric.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    try {
        const district = await DistrictModel.getAll();
        res.status(200).json(createApiResponse("success", district));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res) => {
    try {
        const newRecord = await DistrictModel.create(req.validatedData);

        res.status(201).json(
            createApiResponse("success", {
                district_id: newRecord.insertId,
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
        const record = await DistrictModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await DistrictModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                district_id: id,
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
        const record = await DistrictModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        await DistrictModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await DistrictModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await DistrictModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
