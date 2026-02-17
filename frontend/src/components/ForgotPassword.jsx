import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      //SEND OTP
      if (step === 1) {
        if (!email) {
          setError("Email address is required");
          return;
        }

        // const response = await fetch(
        //   "http://localhost:5000/api/users/forgot-password",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email }),
        //   }
        // );

        // const data = await response.json();

        // if (!response.ok) {
        //   throw new Error(data.message);
        // }

        setStep(2);
      }

      // VALIDATE OTP & RESET PASSWORD
      else if (step === 2) {
        if (!otp || !newPassword) {
          setError("All fields are required");
          return;
        }

        // const response = await fetch(
        //   "http://localhost:5000/api/users/reset-password",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ email, otp, newPassword }),
        //   }
        // );

        // const data = await response.json();

        // if (!response.ok) {
        //   // OTP invalid or expired → do NOT reset
        //   setError(data.message);
        //   return;
        // }

        // Only reaches here if OTP is valid
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md w-full text-center bg-black border border-yellow-500/30
                       rounded-2xl p-10 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10
                            flex items-center justify-center mb-6">
              <CheckCircle className="text-yellow-500" size={32} />
            </div>

            <h1 className="text-2xl font-serif text-white mb-3">
              Password Reset Successful
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Your password has been successfully reset, use the new password to login.
            </p>

            <Link to="/login">
              <button
                className="w-full py-3 bg-yellow-500 text-black font-semibold
                           tracking-widest hover:bg-yellow-400 transition-all text-xs"
              >
                BACK TO LOGIN
              </button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md w-full bg-black border border-yellow-500/30
                       rounded-2xl p-10 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
          >
            <Link
              to="/login"
              className="inline-flex items-center text-xs text-gray-400
                         hover:text-yellow-500 transition mb-6"
            >
              <ArrowLeft size={14} className="mr-2" />
              Back to Login
            </Link>

            <h1 className="text-2xl font-serif text-white mb-2 text-center">
              Forgot Password?
            </h1>

            <p className="text-gray-400 text-sm text-center mb-8">
              {step === 1
                ? "Enter your registered email to receive an OTP"
                : "Enter the OTP sent to your email and set a new password"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-black border border-yellow-500/30
                                 pl-10 pr-4 py-3 text-white outline-none
                                 focus:border-yellow-500 transition"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full bg-black border border-yellow-500/30
                                 px-4 py-3 text-white outline-none
                                 focus:border-yellow-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-black border border-yellow-500/30
                                 px-4 py-3 text-white outline-none
                                 focus:border-yellow-500 transition"
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-yellow-500 text-black
                           font-semibold tracking-widest text-xs
                           hover:bg-yellow-400 transition-all
                           disabled:opacity-60"
              >
                {loading
                  ? "PROCESSING..."
                  : step === 1
                  ? "SEND OTP"
                  : "RESET PASSWORD"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-8">
              Remember your password?{" "}
              <Link to="/login" className="text-yellow-500 hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;
