"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Users,
  MapPin,
  Shield,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Gamepad2,
} from "lucide-react";

export default function PUBGPage() {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderWhatsApp: "",
    leaderPUBGId: "",
    player2Name: "",
    player2Id: "",
    player3Name: "",
    player3Id: "",
    player4Name: "",
    player4Id: "",
    paymentScreenshot: "",
    transactionId: "",
    liveStreamVote: "yes",
    agreedToTerms: false,
  });

  const [stats, setStats] = useState({ pubgTeams: 0, pubgSlots: 25 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats({ pubgTeams: data.pubgTeams, pubgSlots: data.pubgSlots });
    } catch {
      console.error("Failed to fetch stats");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData({ ...formData, paymentScreenshot: base64 });
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/register/pubg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: formData.teamName,
          leaderName: formData.leaderName,
          leaderWhatsApp: formData.leaderWhatsApp,
          leaderPUBGId: formData.leaderPUBGId,
          player2: { name: formData.player2Name, gameId: formData.player2Id },
          player3: { name: formData.player3Name, gameId: formData.player3Id },
          player4: { name: formData.player4Name, gameId: formData.player4Id },
          paymentScreenshot: formData.paymentScreenshot,
          transactionId: formData.transactionId,
          liveStreamVote: formData.liveStreamVote,
          agreedToTerms: formData.agreedToTerms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        // Reset form
        setFormData({
          teamName: "",
          leaderName: "",
          leaderWhatsApp: "",
          leaderPUBGId: "",
          player2Name: "",
          player2Id: "",
          player3Name: "",
          player3Id: "",
          player4Name: "",
          player4Id: "",
          paymentScreenshot: "",
          transactionId: "",
          liveStreamVote: "yes",
          agreedToTerms: false,
        });
        setImagePreview("");
        fetchStats();
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to register. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const slotsRemaining = stats.pubgSlots - stats.pubgTeams;
  const isFull = slotsRemaining <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-semibold">
                Back to Home
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              <span className="text-base sm:text-xl font-bold text-white hidden sm:inline">
                PUBG Mobile
              </span>
              <span className="text-base font-bold text-white sm:hidden">
                PUBG
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-8 sm:py-12 md:py-16 bg-gradient-to-r from-orange-600/20 to-red-600/20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text px-2"
          >
            PUBG Mobile Squad Tournament
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4"
          >
            Ultimate Battle Arena - Show Your Skills & Win Big! 🏆
          </motion.p>

          {/* Slots Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-white/10 backdrop-blur-sm border border-orange-500/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4"
          >
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {slotsRemaining} / {stats.pubgSlots}
            </div>
            <div className="text-xs sm:text-sm text-gray-300">
              Slots Remaining
            </div>
            {isFull && (
              <div className="mt-2 text-red-400 font-semibold text-sm">
                Registration Closed
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 rounded-xl p-4 sm:p-6">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              ₹1000
            </h3>
            <p className="text-sm sm:text-base text-gray-400">Winner Prize</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 rounded-xl p-4 sm:p-6">
            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              ₹400
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Runner-up Prize
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/30 rounded-xl p-4 sm:p-6">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              ₹80
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Entry Fee per Team
            </p>
          </div>
        </div>

        {/* Key Details */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-500" />
            Tournament Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-start gap-3">
              <Gamepad2 className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Game Mode</div>
                <div>Squad (4 Players per Team)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Map</div>
                <div>Erangel (Classic)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Platform</div>
                <div>Mobile Only (No Emulators)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Registration</div>
                <div>First Come, First Serve</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            Important Rules
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>Each team must have exactly 4 members</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>Only mobile players allowed - No emulator players permitted</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                No hacks, cheats, or third-party tools - Immediate
                disqualification
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                Team names and IDs must be correct - No changes after submission
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>Once registered, fees are non-refundable</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                Room ID and Password will be shared 15 minutes before the match
                via WhatsApp
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>Organizer&apos;s decisions are final and must be respected</p>
            </div>
          </div>
        </div>

        {/* Payment QR Code */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Payment Information
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-gray-300 mb-6 text-center">
              Scan the QR code below to make payment of ₹80 and upload the
              screenshot in the form
            </p>
            <div className="bg-white p-4 rounded-2xl">
              <Image
                src="/payment-qr.png"
                alt="Payment QR Code"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
            <p className="text-red-400 mt-6 font-semibold text-center">
              ⚠️ No refund after payment - Even if your team doesn&apos;t join
              or gets disqualified
            </p>
          </div>
        </div>

        {/* Registration Form */}
        {!isFull && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
              Team Registration Form
            </h2>

            {message.text && (
              <div
                className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border text-sm sm:text-base ${
                  message.type === "success"
                    ? "bg-green-500/10 border-green-500 text-green-400"
                    : "bg-red-500/10 border-red-500 text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Team Information */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-orange-500 mb-3 sm:mb-4">
                  Team Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-white mb-2 text-sm sm:text-base">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.teamName}
                      onChange={(e) =>
                        setFormData({ ...formData, teamName: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter your team name"
                    />
                  </div>
                </div>
              </div>

              {/* Team Leader */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-orange-500 mb-3 sm:mb-4">
                  Team Leader Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-white mb-2 text-sm sm:text-base">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.leaderName}
                      onChange={(e) =>
                        setFormData({ ...formData, leaderName: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Leader's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm sm:text-base">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.leaderWhatsApp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          leaderWhatsApp: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white mb-2 text-sm sm:text-base">
                      PUBG Mobile ID (9-10 digits) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.leaderPUBGId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          leaderPUBGId: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter 9 or 10 digit PUBG ID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 2 */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Player 2 Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.player2Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          player2Name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 2 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">PUBG ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.player2Id}
                      onChange={(e) =>
                        setFormData({ ...formData, player2Id: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 2 PUBG ID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 3 */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Player 3 Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.player3Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          player3Name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 3 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">PUBG ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.player3Id}
                      onChange={(e) =>
                        setFormData({ ...formData, player3Id: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 3 PUBG ID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 4 */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Player 4 Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.player4Name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          player4Name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 4 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">PUBG ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.player4Id}
                      onChange={(e) =>
                        setFormData({ ...formData, player4Id: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Player 4 PUBG ID"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Payment Confirmation
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">
                      Upload Payment Screenshot *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 transition-colors"
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <Image
                          src={imagePreview}
                          alt="Payment Preview"
                          width={300}
                          height={300}
                          className="max-w-xs rounded-lg border border-white/20"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Transaction ID / Reference Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.transactionId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transactionId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </div>
              </div>

              {/* Live Stream Vote */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-4">
                  Live Stream
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <label className="block text-white mb-3">
                    Would you like to watch the match live on YouTube?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="liveStream"
                        value="yes"
                        checked={formData.liveStreamVote === "yes"}
                        onChange={() =>
                          setFormData({ ...formData, liveStreamVote: "yes" })
                        }
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-white">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="liveStream"
                        value="no"
                        checked={formData.liveStreamVote === "no"}
                        onChange={() =>
                          setFormData({ ...formData, liveStreamVote: "no" })
                        }
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-white">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreedToTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreedToTerms: e.target.checked,
                      })
                    }
                    className="mt-1 w-5 h-5 text-orange-500"
                  />
                  <span className="text-gray-300">
                    I agree to all the rules and confirm that my team will
                    follow fair gameplay. I understand that fees are
                    non-refundable and organizer&apos;s decisions are final. *
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register Team 🎮"}
              </button>
            </form>
          </div>
        )}

        {isFull && (
          <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Registration Closed
            </h3>
            <p className="text-gray-300">
              All 25 slots have been filled. Stay tuned for the next tournament!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
