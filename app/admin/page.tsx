"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Users,
  Download,
  Trophy,
  Gamepad2,
  Zap,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { PUBGTeam, FreeFireTeam, DatabaseStats } from "../../types";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"pubg" | "freefire">("pubg");
  const [pubgTeams, setPubgTeams] = useState<PUBGTeam[]>([]);
  const [freeFireTeams, setFreeFireTeams] = useState<FreeFireTeam[]>([]);
  const [stats, setStats] = useState<DatabaseStats>({
    pubgTeams: 0,
    freeFireTeams: 0,
    pubgSlots: 25,
    freeFireSlots: 12,
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/pubg-teams");
      if (res.ok) {
        setIsLoggedIn(true);
        loadData();
      }
    } catch {
      console.log("Not authenticated");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        loadData();
      } else {
        const data = await response.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [pubgRes, ffRes, statsRes] = await Promise.all([
        fetch("/api/admin/pubg-teams"),
        fetch("/api/admin/freefire-teams"),
        fetch("/api/stats"),
      ]);

      if (pubgRes.ok) {
        const pubg = await pubgRes.json();
        setPubgTeams(pubg);
      }

      if (ffRes.ok) {
        const ff = await ffRes.json();
        setFreeFireTeams(ff);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch {
      console.error("Failed to load data");
    }
  };

  const handleExport = async (game: "pubg" | "freefire") => {
    try {
      const res = await fetch(`/api/admin/export/${game}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${game.toUpperCase()}_Teams_${
          new Date().toISOString().split("T")[0]
        }.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch {
      console.error("Export failed");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Tournament Management Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-white mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              Default: admin / admin123
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  const currentTeams = activeTab === "pubg" ? pubgTeams : freeFireTeams;
  const yesVotes = currentTeams.filter(
    (t) => t.liveStreamVote === "yes"
  ).length;
  const noVotes = currentTeams.filter((t) => t.liveStreamVote === "no").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 text-sm">Tournament Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-500/30 rounded-xl p-6">
            <Gamepad2 className="w-10 h-10 text-orange-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.pubgTeams}
            </div>
            <div className="text-gray-400">PUBG Teams</div>
            <div className="text-sm text-orange-400 mt-2">
              {stats.pubgSlots - stats.pubgTeams} slots left
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/30 rounded-xl p-6">
            <Zap className="w-10 h-10 text-red-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.freeFireTeams}
            </div>
            <div className="text-gray-400">Free Fire Teams</div>
            <div className="text-sm text-red-400 mt-2">
              {stats.freeFireSlots - stats.freeFireTeams} slots left
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-transparent border border-green-500/30 rounded-xl p-6">
            <Users className="w-10 h-10 text-green-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.pubgTeams + stats.freeFireTeams}
            </div>
            <div className="text-gray-400">Total Teams</div>
            <div className="text-sm text-green-400 mt-2">
              {(stats.pubgTeams + stats.freeFireTeams) * 4} players
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/30 rounded-xl p-6">
            <Trophy className="w-10 h-10 text-blue-500 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              ₹{(stats.pubgTeams + stats.freeFireTeams) * 80}
            </div>
            <div className="text-gray-400">Total Revenue</div>
            <div className="text-sm text-blue-400 mt-2">From registrations</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("pubg")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "pubg"
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            PUBG Mobile ({pubgTeams.length})
          </button>
          <button
            onClick={() => setActiveTab("freefire")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "freefire"
                ? "bg-red-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            <Zap className="w-5 h-5" />
            Free Fire ({freeFireTeams.length})
          </button>
        </div>

        {/* Live Stream Votes */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Live Stream Voting Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {yesVotes}
              </div>
              <div className="text-gray-300">Want Live Stream (Yes)</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400 mb-1">
                {noVotes}
              </div>
              <div className="text-gray-300">Don&apos;t Want (No)</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-lg font-semibold text-white">
              Result:{" "}
              {yesVotes > noVotes
                ? "✅ Live Stream on YouTube"
                : "❌ No Live Stream"}
            </span>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={() => handleExport(activeTab)}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            Export {activeTab === "pubg" ? "PUBG" : "Free Fire"} Teams to Excel
          </button>
        </div>

        {/* Teams List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Team Name
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Leader
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    WhatsApp
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    {activeTab === "pubg" ? "PUBG ID" : "UID"}
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Live Vote
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 text-white font-semibold">
                      {team.teamName}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {team.leaderName}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {team.leaderWhatsApp}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activeTab === "pubg"
                        ? (team as PUBGTeam).leaderPUBGId
                        : (team as FreeFireTeam).leaderUID}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {team.transactionId}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          team.liveStreamVote === "yes"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {team.liveStreamVote.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {new Date(team.registeredAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentTeams.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No teams registered yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
