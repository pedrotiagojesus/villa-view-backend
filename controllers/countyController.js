// Models
import CountyModel from "../models/countyModel.js";
import DistrictModel from "../models/districtModel.js";

// Utils
import { createApiResponse } from "../utils/response.js";

// Data
import dataList from "../data/county.json" assert { type: "json" };

export const listRecords = async (req, res) => {
    const districtId = req.query.districtId ?? null;

    try {
        const data = await CountyModel.getAll(districtId);
        res.status(200).json(createApiResponse("success", data));
    } catch (error) {
        next(error);
    }
};

export const createRecord = async (req, res) => {
    try {
        const { district_id } = req.validatedData;

        // Find district
        const district = await DistrictModel.get(district_id);

        if (!district) {
            throw new ApiError(
                404,
                `O district_id fornecido não existe.`,
                "RECORD_NOT_FOUND"
            );
        }

        const newRecord = await CountyModel.create(req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                county_id: newRecord.insertId,
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
        const { district_id } = req.validatedData;

        // Find record
        const record = await CountyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        // Find district
        const district = await DistrictModel.get(district_id);

        if (!district) {
            throw new ApiError(
                404,
                `O district_id fornecido não existe.`,
                "RECORD_NOT_FOUND"
            );
        }

        await CountyModel.update(id, req.validatedData);
        res.status(201).json(
            createApiResponse("success", {
                county_id: id,
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
        const record = await CountyModel.get(id);

        if (!record) {
            throw new ApiError(
                404,
                `Registo não encontrado.`,
                "RECORD_NOT_FOUND"
            );
        }

        // TODO: Arranjar maneira de fazer um soft delete e um hard delete
        // TODO: Garantir que o primary key desta tabela não está em uso noutras tabelas

        await CountyModel.delete(id);
        res.status(200).json(createApiResponse("success"));
    } catch (error) {
        next(error);
    }
};

export const truncate = async (req, res) => {
    try {
        const truncate = await CountyModel.truncate();
        res.status(200).json(createApiResponse("success", truncate));
    } catch (error) {
        next(error);
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await CountyModel.create(item);
        }

        res.status(201).json(
            createApiResponse("success", "List loaded sucessfuly.")
        );
    } catch (error) {
        next(error);
    }
};
