import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ChallengeCard = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30 hover:border-warning/50 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 text-8xl opacity-10">🎯</div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-warning text-warning-foreground">Active Challenge</Badge>
          <span className="text-sm text-muted-foreground">7 days left</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">No-Dining Out December</h3>
        <p className="text-muted-foreground mb-4">
          Save money by cooking at home this month. Current streak: 12 days! 🔥
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-secondary rounded-full h-2">
            <div className="bg-gradient-success h-full rounded-full w-[60%]"></div>
          </div>
          <span className="text-sm font-semibold">18/30 days</span>
        </div>
        <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/30">
          <p className="text-sm text-success font-semibold">
            💰 Potential Savings: ₹5,400
          </p>
        </div>
      </div>
    </Card>
  );
};
