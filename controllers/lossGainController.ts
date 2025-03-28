import { Request, Response } from "express";
import LossGain from "../models/lossgain";

const getLossGainRecords = async (req: Request, res: Response) => {
    try {
        const records = await LossGain.find().populate("product", "name price");
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get loss/gain for a specific product
const getLossGainByProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const records = await LossGain.find({ product: id }).populate("product", "name price");
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default {
    getLossGainRecords,
    getLossGainByProduct,
};