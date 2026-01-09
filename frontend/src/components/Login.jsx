import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate("/");
    }, 1200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-neutral-900 to-black px-4 pt-12 backdrop-blur-2xl">
      
      <div className="w-full max-w-md rounded-2xl p-8 
        bg-white/5 backdrop-blur-2xl border border-white/10 
        shadow-2xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-yellow-400">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Log in to access premium gym wear collections.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-2 w-full h-12 rounded-lg 
              bg-black/40 backdrop-blur-md border border-white/10 
              px-4 text-sm text-white placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-12 rounded-lg 
                bg-black/40 backdrop-blur-md border border-white/10 
                px-4 pr-12 text-sm text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-yellow-400" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-yellow-400 text-black 
            rounded-lg font-semibold uppercase tracking-wide 
            hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-400 pt-2">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-400 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Login;
