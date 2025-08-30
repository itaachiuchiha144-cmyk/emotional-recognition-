import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Brain, Sparkles, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary rounded-xl p-2">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SmartEats AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link-active">Home</Link>
            <Link to="#about" className="nav-link">About</Link>
            <Link to="#contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">AI-Powered</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Smart AI-Powered
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
                Meal Recommendations
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Get personalized meal suggestions tailored to your taste, dietary preferences, and budget. 
              Let our AI chef recommend the perfect dishes for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button className="btn-hero group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-foreground border-border hover:bg-muted">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-up lg:animate-delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Today's Recommendation</h3>
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
                    <div>
                      <p className="font-medium text-foreground">Spicy Chicken Tikka</p>
                      <p className="text-sm text-muted-foreground">Perfect for your taste • $12.99</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-coral-50 to-orange-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-orange-400 rounded-full"></div>
                    <div>
                      <p className="font-medium text-foreground">Mediterranean Bowl</p>
                      <p className="text-sm text-muted-foreground">Healthy choice • $10.99</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose SmartEats AI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intelligent recommendation engine learns your preferences and suggests the perfect meals every time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 animate-fade-in">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">Advanced machine learning algorithms analyze your preferences for perfect recommendations.</p>
          </div>
          
          <div className="text-center p-6 animate-fade-in animation-delay-200">
            <div className="bg-gradient-to-r from-accent to-orange-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Personalized</h3>
            <p className="text-muted-foreground">Tailored suggestions based on your dietary preferences, budget, and taste profile.</p>
          </div>
          
          <div className="text-center p-6 animate-fade-in animation-delay-400">
            <div className="bg-gradient-to-r from-secondary to-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Expert Curated</h3>
            <p className="text-muted-foreground">Every recommendation is curated by food experts and nutritionists for quality assurance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;