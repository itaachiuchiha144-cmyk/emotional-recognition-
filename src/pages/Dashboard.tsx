import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ChefHat, Filter, Star, Clock, DollarSign } from 'lucide-react';
import { meals } from '@/data/meals';

const Dashboard = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [budget, setBudget] = useState([50]);

  const filteredMeals = meals.filter(meal => {
    const cuisineMatch = selectedCuisine === 'all' || meal.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
    const dietMatch = !isVegetarian || meal.isVegetarian;
    const budgetMatch = meal.price <= budget[0];
    
    return cuisineMatch && dietMatch && budgetMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary rounded-xl p-2">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SmartEats AI</span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="nav-link-active">Recommendations</Link>
              <Link to="/#about" className="nav-link">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 filter-sidebar rounded-2xl h-fit">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            </div>
            
            <div className="space-y-6">
              {/* Cuisine Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Cuisine Type</label>
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vegetarian Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Vegetarian Only</label>
                <Switch
                  checked={isVegetarian}
                  onCheckedChange={setIsVegetarian}
                />
              </div>

              {/* Budget Slider */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Budget Range: ${budget[0]}
                </label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={100}
                  min={5}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>$5</span>
                  <span>$100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AI Meal Recommendations
              </h1>
              <p className="text-muted-foreground">
                Discover personalized meal suggestions based on your preferences
              </p>
            </div>

            {/* Meal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMeals.map((meal, index) => (
                <div key={meal.id} className="food-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="relative mb-4">
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-medium">{meal.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-gradient-primary text-white px-2 py-1 rounded-lg">
                      <span className="text-xs font-medium">{meal.cuisine}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground text-lg">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{meal.prepTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <span>{meal.calories} cal</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary text-lg">{meal.price}</span>
                      </div>
                      <Button className="bg-accent hover:bg-accent-hover text-white">
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMeals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No meals match your current filters. Try adjusting your preferences!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;