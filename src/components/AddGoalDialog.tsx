import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddGoalDialogProps {
  onGoalAdded: () => void;
}

const emojiOptions = ["💻", "🏖️", "🛡️", "🚗", "🏠", "✈️", "📱", "🎓", "💍", "🎯"];

export const AddGoalDialog = ({ onGoalAdded }: AddGoalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to add goals");
      }

      const { error } = await supabase
        .from("savings_goals")
        .insert({
          user_id: user.id,
          name,
          target: parseFloat(target),
          current: 0,
          emoji: selectedEmoji,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Savings goal added successfully",
      });

      setName("");
      setTarget("");
      setSelectedEmoji("🎯");
      setOpen(false);
      onGoalAdded();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add goal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full mt-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          + Add New Goal
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Add New Savings Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., New Laptop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target Amount (₹)</Label>
            <Input
              id="target"
              type="number"
              placeholder="e.g., 80000"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Choose an emoji</Label>
            <div className="grid grid-cols-5 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-3xl p-2 rounded-lg border-2 transition-all ${
                    selectedEmoji === emoji
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Goal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
