import ProtectedRoute from "@/components/ProtectedRoute";
import TopBar from "@/components/TopBar";
import MoodPicker from "@/components/MoodPicker";
import JournalCard from "@/components/JournalCard";
import CalmCorner from "@/components/CalmCorner";
import MoodChart from "@/components/MoodChart";
import IntroReveal from "@/components/IntroReveal";
import JournalTimeline from "@/components/JournalTimeline";
import Footer from "@/components/Footer"
export default function Home() {
  return (
    <ProtectedRoute>
      <IntroReveal />
      <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-[#b2d8f7] via-[#a0e9e0] to-[#e2c2f0]">
        <div className="max-w-6xl mx-auto space-y-6">
          <TopBar />
          <MoodPicker />
          <JournalCard />
          <JournalTimeline />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MoodChart />
            </div>
            <CalmCorner />
          </div>
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}
