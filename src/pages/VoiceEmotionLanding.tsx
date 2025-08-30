import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, Brain, AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VoiceEmotionLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Voice Emotion AI
            </motion.h1>
            <div className="flex items-center space-x-6">
              <a href="#features" className="nav-link">Features</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                  "drop-shadow(0 0 30px hsl(var(--primary) / 0.5))",
                  "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mic className="w-20 h-20 text-primary" />
            </motion.div>
          </div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Decode Emotions
            <br />
            <span className="text-3xl md:text-5xl">Through Voice</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Advanced AI-powered voice analysis to detect and analyze human emotions 
            in real-time with unprecedented accuracy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              onClick={() => navigate("/upload")}
              className="btn-neon text-lg px-12 py-6 h-auto"
            >
              <AudioWaveform className="w-6 h-6 mr-3" />
              Start Analysis
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div 
            className="neon-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Advanced machine learning algorithms trained on thousands of voice samples
            </p>
          </motion.div>

          <motion.div 
            className="neon-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <AudioWaveform className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Real-time Processing</h3>
            <p className="text-muted-foreground">
              Instant emotion detection with confidence scores and detailed analysis
            </p>
          </motion.div>

          <motion.div 
            className="neon-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Mic className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Multi-format Support</h3>
            <p className="text-muted-foreground">
              Support for WAV, MP3, and other popular audio formats
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}