const Contract = require('../models/contracts');
const Operation = require('../models/operations');
const { Op } = require('../models');

const getOperation = async (req, res) => {
  try {
    const { id } = req.params; // Operation id
    const operation = await Operation.findOne({ where: { id: id } });
    res.status(200);
    res.send(operation);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get op.' });
  }
}

const getContractCurrentOp = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id: id } });
    // Sould only be one operation with null endDate at a time
    const operation = await contract.getOperations({
      where: {
        endDate: {
          [Op.eq]: null
        }
      }
    });
    res.status(200);
    // Returns array of operations, but there should only be one
    res.send(operation[0]);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get current op.' });
  }
}

const getContractPastOp = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id: id } });
    const operations = await contract.getOperations({
      where: {
        endDate: {
          [Op.ne]: null
        }
      }
    });
    res.status(200);
    res.send(operations);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get past operations.' });
  }
}

const createOperation = async (req, res) => {
  try {
    const { id } = req.params; // Contract id
    const contract = await Contract.findOne({ where: { id: id } });
    const { name, objectives, startDate } = req.body;
    const newOperation = { name, objectives, startDate };
    const operation = await Operation.create(newOperation);
    await contract.addOperation(operation);
    res.status(201).send(operation);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not create op.' });
  }
}

const updateOperation = async (req, res) => {
  try {
    const { id } = req.params; // Operation id
    const operation = await Operation.findOne({ where: { id: id } });
    const { name, objectives, startDate, endDate } = req.body;
    console.log('req.body: ', req.body);
    operation.name = name;
    operation.objectives = objectives;
    operation.startDate = startDate;
    if (endDate) operation.endDate = endDate;
    await operation.save();
    res.status(200).send(operation);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not update contract.' });
  }
}

module.exports = {
  getOperation,
  getContractCurrentOp,
  getContractPastOp,
  createOperation,
  updateOperation
}