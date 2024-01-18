const router = require("express").Router()
const salesReportController = require("../controller/salesReportController")

router.get('/', salesReportController.getAllTransaction)
router.get('/by-date', salesReportController.getSalesByDateRange)
router.get('/aggregate-per-day', salesReportController.getSalesAggregatePerDay)
router.get('/stats-per-day', salesReportController.getTotalStatsPerDay)

module.exports = router