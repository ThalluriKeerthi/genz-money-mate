import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  emoji: string;
}

const goals: Goal[] = [
  { id: "1", name: "New Laptop", target: 80000, current: 45000, emoji: "💻" },
  { id: "2", name: "Goa Trip", target: 30000, current: 22000, emoji: "🏖️" },
  { id: "3", name: "Emergency Fund", target: 100000, current: 65000, emoji: "🛡️" },
];

export const SavingsGoals = () => {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h2 className="text-xl font-bold mb-6">Savings Goals</h2>
      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{goal.emoji}</span>
                  <div>
                    <p className="font-semibold">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{goal.current.toLocaleString('en-IN')} of ₹{goal.target.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          );
        })}
        <button className="w-full mt-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          + Add New Goal
        </button>
      </div>
    </Card>
  );
};
