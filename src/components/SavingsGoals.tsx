import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddGoalDialog } from "./AddGoalDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  emoji: string;
}

export const SavingsGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from("savings_goals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setGoals(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load savings goals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h2 className="text-xl font-bold mb-6">Savings Goals</h2>
      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading goals...</p>
        ) : goals.length === 0 ? (
          <p className="text-center text-muted-foreground">No savings goals yet. Add your first goal!</p>
        ) : (
          goals.map((goal) => {
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
        })
        )}
        <AddGoalDialog onGoalAdded={fetchGoals} />
      </div>
    </Card>
  );
};
