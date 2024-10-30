const HealthLog = require('../models/HealthLog');
const Exercise = require('../models/Exercise');
const Meal = require('../models/Meal');

exports.getHealthSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user._id;

        // Date range query
        const dateQuery = {
            user: userId,
            date: {
                $gte: new Date(startDate || new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(endDate || Date.now())
            }
        };

        // Get weight progress
        const weightProgress = await HealthLog.aggregate([
            { $match: dateQuery },
            { $sort: { date: 1 } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    weight: { $last: "$weight" }
                }
            }
        ]);

        // Get exercise summary
        const exerciseSummary = await Exercise.aggregate([
            { $match: dateQuery },
            {
                $group: {
                    _id: "$type",
                    totalDuration: { $sum: "$duration" },
                    totalCaloriesBurned: { $sum: "$caloriesBurned" },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get nutrition summary
        const nutritionSummary = await Meal.aggregate([
            { $match: dateQuery },
            {
                $group: {
                    _id: "$type",
                    totalCalories: { $sum: "$totalCalories" },
                    averageProtein: { $avg: { $sum: "$foods.protein" } },
                    averageCarbs: { $avg: { $sum: "$foods.carbs" } },
                    averageFats: { $avg: { $sum: "$foods.fats" } }
                }
            }
        ]);

        // Calculate trends
        const trends = {
            weightChange: weightProgress.length >= 2 ? 
                weightProgress[weightProgress.length - 1].weight - weightProgress[0].weight : 0,
            averageCaloriesBurned: exerciseSummary.length > 0 ? 
                exerciseSummary.reduce((acc, curr) => acc + (curr.totalCaloriesBurned || 0), 0) / exerciseSummary.length : 0,
            averageCaloriesConsumed: nutritionSummary.length > 0 ? 
                nutritionSummary.reduce((acc, curr) => acc + (curr.totalCalories || 0), 0) / nutritionSummary.length : 0
        };

        res.json({
            weightProgress,
            exerciseSummary,
            nutritionSummary,
            trends
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateReport = async (req, res) => {
    try {
        const { reportType, startDate, endDate } = req.body;
        const userId = req.user._id;

        const dateQuery = {
            user: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        let reportData;
        switch (reportType) {
            case 'weight':
                reportData = await HealthLog.find(dateQuery)
                    .select('date weight notes')
                    .sort('date');
                break;
            case 'exercise':
                reportData = await Exercise.find(dateQuery)
                    .select('date type duration caloriesBurned')
                    .sort('date');
                break;
            case 'nutrition':
                reportData = await Meal.find(dateQuery)
                    .select('date type foods totalCalories')
                    .sort('date');
                break;
            default:
                throw new Error('Invalid report type');
        }

        res.json({
            reportType,
            dateRange: { startDate, endDate },
            data: reportData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
