"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Trophy,
  Users,
  MapPin,
  Shield,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Upload,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SlotsCounter } from "@/components/slots-counter";
import { useStats } from "@/hooks/useStats";
import { SuccessConfetti } from "@/components/success-confetti";
import { formatCurrency } from "@/lib/utils";

export default function FreeFirePage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderWhatsApp: "",
    leaderUID: "",
    player2Name: "",
    player2UID: "",
    player3Name: "",
    player3UID: "",
    player4Name: "",
    player4UID: "",
    paymentScreenshot: "",
    transactionId: "",
    liveStreamVote: "yes",
    agreedToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

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

    try {
      const response = await fetch("/api/register/freefire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: formData.teamName,
          leaderName: formData.leaderName,
          leaderWhatsApp: formData.leaderWhatsApp,
          leaderUID: formData.leaderUID,
          player2: { name: formData.player2Name, gameId: formData.player2UID },
          player3: { name: formData.player3Name, gameId: formData.player3UID },
          player4: { name: formData.player4Name, gameId: formData.player4UID },
          paymentScreenshot: formData.paymentScreenshot,
          transactionId: formData.transactionId,
          liveStreamVote: formData.liveStreamVote,
          agreedToTerms: formData.agreedToTerms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! 🎉");
        setShowConfetti(true);
        setFormData({
          teamName: "",
          leaderName: "",
          leaderWhatsApp: "",
          leaderUID: "",
          player2Name: "",
          player2UID: "",
          player3Name: "",
          player3UID: "",
          player4Name: "",
          player4UID: "",
          paymentScreenshot: "",
          transactionId: "",
          liveStreamVote: "yes",
          agreedToTerms: false,
        });
        setImagePreview("");
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slotsRemaining =
    (stats?.freeFireSlots || 12) - (stats?.freeFireTeams || 0);
  const isFull = slotsRemaining <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SuccessConfetti show={showConfetti} />
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-16 bg-gradient-to-r from-red-600/20 to-pink-600/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-transparent bg-clip-text"
          >
            Free Fire Squad Tournament
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Are you ready to become the ultimate Free Fire champion? 💥
          </motion.p>

          {/* Slots Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-white/10 backdrop-blur-sm border border-red-500/50 rounded-2xl px-8 py-4"
          >
            <div className="text-3xl font-bold text-white mb-1">
              {slotsRemaining} / {stats?.freeFireSlots || 12}
            </div>
            <div className="text-sm text-gray-300">Slots Remaining</div>
            {isFull && (
              <div className="mt-2 text-red-400 font-semibold">
                Registration Closed
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/30 rounded-xl p-6">
            <Trophy className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">₹500</h3>
            <p className="text-gray-400">Winner Prize</p>
          </div>
          <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/30 rounded-xl p-6">
            <DollarSign className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">₹260</h3>
            <p className="text-gray-400">Runner-up Prize</p>
          </div>
          <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/30 rounded-xl p-6">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">₹80</h3>
            <p className="text-gray-400">Entry Fee per Team</p>
          </div>
        </div>

        {/* Key Details */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            Tournament Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Game Mode</div>
                <div>Battle Royale - Squad (4 Players)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Map</div>
                <div>Bermuda / Purgatory / Kalahari</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Platform</div>
                <div>Mobile Only (No Emulators)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <div className="font-semibold text-white">Total Slots</div>
                <div>12 Teams (48 Players Maximum)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            Rules & Regulations
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                No hacks, mods, or third-party apps - Instant disqualification
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>No emulator players - Mobile players only</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                Teams must join the room within 10 minutes of ID and Password
                being shared
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>No team or player changes allowed after registration</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                All players must play on the same Free Fire UID submitted during
                registration
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                If a player gets disconnected during a match, no rematch or
                refund will be provided
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                Use of abusive or toxic language will result in disqualification
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>Organizer&apos;s decision is final in all matters</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                Room ID & Password will be shared 15 minutes before match on
                WhatsApp
              </p>
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Team Registration Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Information */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
                  Team Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Team Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.teamName}
                      onChange={(e) =>
                        setFormData({ ...formData, teamName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Enter your team name"
                    />
                  </div>
                </div>
              </div>

              {/* Team Leader */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
                  Team Leader Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.leaderName}
                      onChange={(e) =>
                        setFormData({ ...formData, leaderName: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Leader's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white mb-2">
                      Free Fire UID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.leaderUID}
                      onChange={(e) =>
                        setFormData({ ...formData, leaderUID: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Enter Free Fire UID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 2 */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 2 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Free Fire UID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.player2UID}
                      onChange={(e) =>
                        setFormData({ ...formData, player2UID: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 2 UID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 3 */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 3 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Free Fire UID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.player3UID}
                      onChange={(e) =>
                        setFormData({ ...formData, player3UID: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 3 UID"
                    />
                  </div>
                </div>
              </div>

              {/* Player 4 */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 4 name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Free Fire UID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.player4UID}
                      onChange={(e) =>
                        setFormData({ ...formData, player4UID: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Player 4 UID"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-red-500 file:text-white file:cursor-pointer hover:file:bg-red-600 transition-colors"
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Payment Preview"
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </div>
              </div>

              {/* Live Stream Vote */}
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-4">
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
                        onChange={(e) =>
                          setFormData({ ...formData, liveStreamVote: "yes" })
                        }
                        className="w-4 h-4 text-red-500"
                      />
                      <span className="text-white">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="liveStream"
                        value="no"
                        checked={formData.liveStreamVote === "no"}
                        onChange={(e) =>
                          setFormData({ ...formData, liveStreamVote: "no" })
                        }
                        className="w-4 h-4 text-red-500"
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
                    className="mt-1 w-5 h-5 text-red-500"
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
                className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-red-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register Team 🔥"}
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
              All 12 slots have been filled. Stay tuned for the next tournament!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
