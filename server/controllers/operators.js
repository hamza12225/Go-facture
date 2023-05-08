import Operator from "../models/Operator.js";

/* CREATE */
export const addoperator = async (req, res) => {
  try {
    const { name ,type} = req.body;
    const newOperator = new Operator({
      name,
      type
    });
    await newOperator.save();
    res.status(201).json(newOperator);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const readOperators = async (req, res) => {
  try {
    const operators = await Operator.find();
    res.status(200).json(operators);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
