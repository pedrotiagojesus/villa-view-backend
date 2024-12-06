import DistrictModel from "../models/districtModel.js";

import dataList from "../data/distric.json" assert { type: "json" };

export const listDistrict = async (req, res) => {
    try {
        const district = await DistrictModel.getAll();
        res.status(200).json(district);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createDistrict = async (req, res) => {
    try {
        const newDistrict = await DistrictModel.create(req.body);
        res.status(201).json(newDistrict);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const truncate = async (req, res) => {
    try {
        await DistrictModel.truncate();
        res.status(200).json("Tabela limpa com sucesso.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loadData = async (req, res) => {
    try {
        for (const item of dataList) {
            await DistrictModel.create(item.name);
        }
        res.status(201).json("List loaded successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
