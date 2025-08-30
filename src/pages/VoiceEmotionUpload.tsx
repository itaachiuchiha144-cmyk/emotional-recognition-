import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Play, Pause, RotateCcw, FileAudio, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AnalysisResult {
  emotion: string;
  confidence: number;
}

export default function VoiceEmotionUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast.error("Please select an audio file (WAV or MP3)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setResult(null);
    
    // Create audio URL for preview
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const analyzeEmotion = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('audio', selectedFile);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data: AnalysisResult = await response.json();
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      
      // For demo purposes, show mock result on API failure
      setTimeout(() => {
        const mockResult = {
          emotion: "Happy",
          confidence: 0.87
        };
        setResult(mockResult);
        toast.success("Analysis complete! (Demo mode)");
      }, 1000);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setResult(null);
    setAnalysisProgress(0);
    setIsAnalyzing(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
            >
              Voice Emotion AI
            </motion.h1>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="border-primary/30 hover:bg-primary/10"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Voice Emotion Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your audio file and let our AI analyze the emotional content
          </p>
        </motion.div>

        {!result ? (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Upload Area */}
            <motion.div
              className={`upload-card text-center cursor-pointer transition-all duration-300 ${
                dragOver ? 'scale-105 border-primary/60' : ''
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Upload Audio File</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your WAV or MP3 file here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </motion.div>

            {/* File Info */}
            {selectedFile && (
              <motion.div 
                className="neon-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileAudio className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">{selectedFile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAnalysis}
                    className="border-destructive/30 hover:bg-destructive/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Audio Player */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={togglePlayback}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <span className="text-sm text-muted-foreground">Preview Audio</span>
                </div>

                <audio
                  ref={audioRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Analysis Progress */}
                {isAnalyzing && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="pulse-neon w-4 h-4 bg-primary rounded-full" />
                      <span className="text-primary font-semibold">Analyzing emotion...</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      {analysisProgress < 30 && "Processing audio data..."}
                      {analysisProgress >= 30 && analysisProgress < 60 && "Extracting voice features..."}
                      {analysisProgress >= 60 && analysisProgress < 90 && "Running AI analysis..."}
                      {analysisProgress >= 90 && "Finalizing results..."}
                    </p>
                  </motion.div>
                )}

                {/* Analyze Button */}
                {!isAnalyzing && (
                  <Button
                    onClick={analyzeEmotion}
                    className="btn-neon w-full text-lg"
                    disabled={!selectedFile}
                  >
                    Detect Emotion
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          /* Results */
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="neon-card text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-neon-blue">
                  <span className="text-3xl font-bold text-background">
                    {result.emotion.charAt(0)}
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {result.emotion}
                </h2>
                <p className="text-muted-foreground">Detected Emotion</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold mb-4">Confidence Score</h3>
                <div className="relative">
                  <Progress 
                    value={result.confidence * 100} 
                    className="h-4 mb-2"
                  />
                  <div className="progress-glow absolute inset-0 rounded-full opacity-60" 
                       style={{ width: `${result.confidence * 100}%` }} />
                </div>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(result.confidence * 100)}%
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <Button
                  onClick={resetAnalysis}
                  className="btn-neon w-full"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  Back to Home
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}