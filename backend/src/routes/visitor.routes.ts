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
    getMemberAnalyticsController,
    getPurposeAnalyticsController,
    updateVisitor,
    assignVisitorMember,
    deleteVisitor
} from "../controllers/visitor.controller";
import { validateCreateVisitor } from "../middleware/validation.middleware";
import { authenticate, authorize } from "../middleware/auth.middleware";

export const visitorRouter = Router();
visitorRouter.get("/stats/overview", authenticate,authorize("ADMIN"), getOverview    
);
visitorRouter.get("/analytics/frequent", authenticate,authorize("ADMIN"), getFrequentVisitorsAnalytics
);
visitorRouter.get("/test", (_req, res) => {
  res.json({ message: "Visitor router is working" });
});
visitorRouter.get( "/analytics/weekly", authenticate,authorize("ADMIN"),getWeeklyAnalyticsController
);

visitorRouter.get("/analytics/members", authenticate, authorize("ADMIN"), getMemberAnalyticsController
);
visitorRouter.get("/analytics/departments", authenticate,authorize("ADMIN"),getDepartmentAnalyticsController
);

visitorRouter.get("/analytics/purpose",  authenticate,authorize("ADMIN"), getPurposeAnalyticsController
);
visitorRouter.get("/", authenticate, authorize("ADMIN", "RECEPTIONIST"), getAllVisitors);

visitorRouter.post("/", validateCreateVisitor,createVisitor
);

visitorRouter.put("/:id", authenticate, authorize("RECEPTIONIST"), updateVisitor
);
visitorRouter.put("/:id/assign", authenticate, authorize("RECEPTIONIST"), assignVisitorMember);
visitorRouter.delete("/:id", authenticate, authorize("RECEPTIONIST"), deleteVisitor
);
visitorRouter.put( "/:id/checkin", authenticate, authorize("RECEPTIONIST"),checkInVisitor

);
visitorRouter.put("/:id/checkout", authenticate, authorize("RECEPTIONIST"), checkOutVisitor
);
