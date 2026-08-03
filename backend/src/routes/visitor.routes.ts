import { Router } from "express";
import {
    getAllVisitors,
    createVisitor,
    checkInVisitor,
    checkOutVisitor,
    getOverview,
    getFrequentVisitorsAnalytics,
    getWeeklyAnalyticsController,
    getDepartmentAnalyticsController,
    getPurposeAnalyticsController,
    updateVisitor,
    deleteVisitor
} from "../controllers/visitor.controller";
import { validateCreateVisitor } from "../middleware/validation.middleware";

export const visitorRouter = Router();
visitorRouter.get("/stats/overview", getOverview
);
visitorRouter.get("/analytics/frequent", getFrequentVisitorsAnalytics
);
visitorRouter.get("/test", (_req, res) => {
  res.json({ message: "Visitor router is working" });
});
visitorRouter.get( "/analytics/weekly",getWeeklyAnalyticsController
);

visitorRouter.get("/analytics/departments",getDepartmentAnalyticsController
);

visitorRouter.get("/analytics/purpose", getPurposeAnalyticsController
);

visitorRouter.get("/", getAllVisitors);

visitorRouter.post("/",
    validateCreateVisitor,
createVisitor
);

visitorRouter.put("/:id", updateVisitor);
visitorRouter.delete("/:id", deleteVisitor);


visitorRouter.put(
    "/:id/checkin",
    checkInVisitor
    
);
visitorRouter.put(
    "/:id/checkout",
    checkOutVisitor
);
