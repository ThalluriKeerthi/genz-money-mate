import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { StatsCard } from "@/components/StatsCard";
import { SpendingChart } from "@/components/SpendingChart";
import { TransactionList } from "@/components/TransactionList";
import { SavingsGoals } from "@/components/SavingsGoals";
import { ChallengeCard } from "@/components/ChallengeCard";
import { WalletIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Finance Buddy
                </h1>
                <p className="text-sm text-muted-foreground">Your money, simplified</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            amount={145600}
            change={12.5}
            icon={<WalletIcon className="w-6 h-6 text-primary-foreground" />}
          />
          <StatsCard
            title="Monthly Income"
            amount={65000}
            change={5.2}
            icon={<TrendingUpIcon className="w-6 h-6 text-primary-foreground" />}
            variant="success"
          />
          <StatsCard
            title="Monthly Spending"
            amount={38500}
            change={-8.1}
            icon={<TrendingDownIcon className="w-6 h-6 text-primary-foreground" />}
            variant="warning"
          />
          <StatsCard
            title="Savings Rate"
            amount={26500}
            change={15.8}
            icon={<TargetIcon className="w-6 h-6 text-primary-foreground" />}
          />
        </div>

        {/* Charts and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <ChallengeCard />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
          <div>
            <SavingsGoals />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Made with 💜 for Gen Z | Your financial wellness companion</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
