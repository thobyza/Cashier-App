const db = require("../models")
const User = db.User;
const Product = db.Product;
const Transaction = db.Transaction;
const TransactionDetail = db.Transaction_detail;
const { Op, col, fn, literal } = require('sequelize');
const { sequelize } = require('../models');

// const sequelize = require('../models/index.js')

module.exports = {
    getAllTransaction: async (req, res) => {
        try {
            const transactions = await Transaction.findAndCountAll({
                include: [
                    {
                        model: TransactionDetail,
                        include: [
                            {
                                model: Product,
                                attributes: ['id', 'name', 'price', 'stock', 'categoryId']
                            }
                        ]
                    },
                    {
                        model: User,
                        attributes: ['fullname']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).send(transactions);
        } catch (err) {
            console.error(err);
            return res.status(400).send({ message: err.message })
        }
    },

    getSalesByDateRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query

            const transactions = await Transaction.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                include: [
                    {
                        model: TransactionDetail,
                        include: [Product],
                    },
                ],
            });

            // Process transactions and details to calculate desired aggregations
            const totalEarnings = transactions.reduce((total, transaction) => {
                return total + transaction.total_amount;
            }, 0);

            const totalOrders = transactions.length;

            const totalQuantity = transactions.reduce((total, transaction) => {
                const details = transaction.Transaction_details;
                return total + details.reduce((subTotal, detail) => subTotal + detail.quantity, 0);
            }, 0);

            const salesReport = {
                totalEarnings,
                totalOrders,
                totalQuantity,
            };

            res.status(200).send(salesReport)

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    getSalesAggregatePerDay: async (req, res) => {
        try {
            const eightDaysAgo = new Date();
            eightDaysAgo.setDate(eightDaysAgo.getDate() - 8)

            const salesAggregate = await Transaction.findAll({
                attributes: [
                    [fn('DATE', col('Transaction.createdAt')), 'date'],
                    [fn('SUM', col('Transaction.total_amount')), 'totalEarnings'],
                    [fn('SUM', col('Transaction_details.quantity')), 'totalQuantity'],
                    [fn('COUNT', col('Transaction.id')), 'totalOrders'],
                ],
                include: [
                    {
                        model: TransactionDetail,
                        attributes: [],
                        where: {
                            createdAt: { [Op.gte]: eightDaysAgo },
                        },
                    },
                ],
                group: [fn('DATE', col('Transaction.createdAt'))],
                raw: true,
                order: [['date', 'ASC']]
            });

            res.status(200).send(salesAggregate)
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message })
        }
    },

    // getTotalStatsPerDay: async (req, res) => {
    //     try {
    //         const statsPerDay = await Transaction.findAll({
    //             attributes: [
    //                 [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
    //                 [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalRevenue'],
    //                 [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
    //             ],
    //             group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
    //             raw: true,
    //             order: [['date', 'ASC']]
    //         });

    //         res.status(200).send(statsPerDay);
    //     } catch (err) {
    //         console.log(err);
    //         res.status(400).send({ message: err.message });
    //     }
    // }

    getTotalStatsPerDay: async (req, res) => {
        try {
            const statsPerDay = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
                    [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalRevenue'],
                    [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
                ],
                group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
                raw: true,
                order: [['date', 'ASC']]
            });

            res.status(200).send(statsPerDay);
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
        }
    }
}
