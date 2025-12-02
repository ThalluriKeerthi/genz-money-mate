import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  { id: "1", name: "Swiggy Food Delivery", category: "Food & Dining", amount: 450, date: "Today", type: "expense" },
  { id: "2", name: "Freelance Payment", category: "Income", amount: 15000, date: "Today", type: "income" },
  { id: "3", name: "Netflix Subscription", category: "Entertainment", amount: 649, date: "Yesterday", type: "expense" },
  { id: "4", name: "Amazon Shopping", category: "Shopping", amount: 2340, date: "2 days ago", type: "expense" },
  { id: "5", name: "Uber Ride", category: "Transport", amount: 285, date: "3 days ago", type: "expense" },
  { id: "6", name: "Salary Credit", category: "Income", amount: 50000, date: "5 days ago", type: "income" },
];

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-warning/20 text-warning-foreground border-warning/30",
  "Income": "bg-success/20 text-success-foreground border-success/30",
  "Entertainment": "bg-primary/20 text-primary-foreground border-primary/30",
  "Shopping": "bg-accent/20 text-accent-foreground border-accent/30",
  "Transport": "bg-muted text-muted-foreground border-muted",
};

export const TransactionList = () => {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <button className="text-sm text-primary hover:text-accent transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 border border-transparent hover:border-primary/30"
          >
            <div className="flex-1">
              <p className="font-semibold">{transaction.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={categoryColors[transaction.category]}>
                  {transaction.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
            </div>
            <div className={`text-lg font-bold ${transaction.type === "income" ? "text-success" : "text-foreground"}`}>
              {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
