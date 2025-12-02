import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface StatsCardProps {
  title: string;
  amount: number;
  change: number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

export const StatsCard = ({ title, amount, change, icon, variant = "default" }: StatsCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ₹{amount.toLocaleString('en-IN')}
          </h3>
          <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <span>{Math.abs(change)}% from last month</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
};
