"use client";

import Link from "next/link";
import {
  Trophy,
  Gamepad2,
  Users,
  Zap,
  DollarSign,
  Clock,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";
import { Navbar } from "../components/navbar";
import { useStats } from "../hooks/useStats";
import { formatCurrency } from "../lib/utils";

export default function HomePage() {
  const { data: stats } = useStats();

  const totalTeams = (stats?.pubgTeams || 0) + (stats?.freeFireTeams || 0);
  const totalRevenue = totalTeams * 80;
  const totalPlayers = totalTeams * 4;

  const pubgSlotsRemaining = (stats?.pubgSlots || 25) - (stats?.pubgTeams || 0);
  const ffSlotsRemaining = (stats?.freeFireSlots || 12) - (stats?.freeFireTeams || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Trophy className="w-20 h-20 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-transparent bg-clip-text">
            Tournament Registration Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Register your team for PUBG Mobile and Free Fire tournaments. Compete for amazing prizes!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{totalTeams}</div>
            <div className="text-gray-400">Teams Registered</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{totalPlayers}</div>
            <div className="text-gray-400">Total Players</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{formatCurrency(totalRevenue)}</div>
            <div className="text-gray-400">Total Prize Pool</div>
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* PUBG Card */}
          <div className="bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <Gamepad2 className="w-12 h-12 text-orange-500" />
              <div>
                <h2 className="text-3xl font-bold text-white">PUBG Mobile</h2>
                <p className="text-gray-400">Squad Tournament</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Winner: <strong className="text-white">₹1,000</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Award className="w-5 h-5 text-gray-400" />
                <span>Runner-up: <strong className="text-white">₹400</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Entry Fee: <strong className="text-white">₹80 per team</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5 text-blue-500" />
                <span>Slots: <strong className="text-white">{pubgSlotsRemaining} / {stats?.pubgSlots || 25} remaining</strong></span>
              </div>
            </div>

            {pubgSlotsRemaining > 0 ? (
              <Link
                href="/pubg"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
              >
                Register Now
              </Link>
            ) : (
              <div className="block w-full bg-red-500/20 border border-red-500 text-red-400 font-semibold py-3 px-6 rounded-xl text-center">
                Registration Closed
              </div>
            )}
          </div>

          {/* Free Fire Card */}
          <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <Zap className="w-12 h-12 text-red-500" />
              <div>
                <h2 className="text-3xl font-bold text-white">Free Fire</h2>
                <p className="text-gray-400">Squad Tournament</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Winner: <strong className="text-white">₹500</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Award className="w-5 h-5 text-gray-400" />
                <span>Runner-up: <strong className="text-white">₹260</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Entry Fee: <strong className="text-white">₹80 per team</strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-5 h-5 text-blue-500" />
                <span>Slots: <strong className="text-white">{ffSlotsRemaining} / {stats?.freeFireSlots || 12} remaining</strong></span>
              </div>
            </div>

            {ffSlotsRemaining > 0 ? (
              <Link
                href="/freefire"
                className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
              >
                Register Now
              </Link>
            ) : (
              <div className="block w-full bg-red-500/20 border border-red-500 text-red-400 font-semibold py-3 px-6 rounded-xl text-center">
                Registration Closed
              </div>
            )}
          </div>
        </div>

        {/* Tournament Details */}
        <div className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-500" />
            Tournament Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Registration</h4>
              <p>Register your team with valid payment proof and game IDs</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Payment</h4>
              <p>₹80 entry fee per team. Payment proof required</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Team Size</h4>
              <p>4 players per squad for both tournaments</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Prize Distribution</h4>
              <p>Winners and runners-up receive instant prize money</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
