import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Zap, Sparkles, BarChart2, Users, FileText, Search } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass w-full border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Product Validator AI
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-primary/20 hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-primary mb-6 animate-pulse">
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Your Next Idea With Confidence</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8">
          Validate Your Startup Idea in{' '}
          <span className="gradient-text">Minutes, Not Weeks</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Stop relying on guesswork. Get AI-powered feasibility scores, market size estimates, competitor analysis, customer personas, and investor-ready PDF reports.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary hover:bg-primary/95 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary/25 hover:scale-[1.03] group text-base"
          >
            <span>Analyze My Idea Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center bg-secondary hover:bg-secondary/80 text-foreground font-medium px-8 py-4 rounded-xl border border-white/5 transition-all text-base"
          >
            Explore Features
          </a>
        </div>

        {/* Mockup Dashboard */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl glass p-3 border border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-30 rounded-2xl pointer-events-none" />
          <div className="rounded-xl overflow-hidden bg-black/60 aspect-[16/9] flex flex-col items-center justify-center p-8 border border-white/5">
            <BarChart2 className="w-16 h-16 text-primary mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold mb-2">Startup Feasibility Score Dashboard</h3>
            <p className="text-muted-foreground text-sm max-w-md text-center">
              Submit your idea description, target industry, and target demographics to instantly unlock customer segments, risk factors, and market metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Equip yourself with structured insights designed to meet the validation standards of top-tier accelerators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Validation & Feasibility Scores</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive an objective numeric benchmark score (1-100) calculated from market entry barriers, implementation complexness, and target alignment.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover:border-accent/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Competitor Landscape</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Scan live web networks via external crawl operations to identify active direct/indirect competitors, strengths, weaknesses, and positioning strategies.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Persona Builder</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Build granular profile schemas of your primary target audience segments, identifying critical pain points, budget options, and buying behavior.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover:border-accent/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">SWOT & Risk Assessment</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Review automated lists showing internal strengths/weaknesses and external opportunities/threats, coupled with key business model hazards.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">MVP Roadmap & GTM</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive customized validation experiments, recommended software stacks, launch schedules, and initial user acquisition tactics.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl hover:border-accent/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">PDF Vector Reports</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Download a professionally formatted report file mapping all diagrams, charts, and texts to share directly with team members or seed investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, Credit-Based Pricing
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            No expensive subscriptions. Get credits and start validating your ideas instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="glass p-8 rounded-3xl border border-white/5 relative flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground text-xs mb-6">Perfect for solo builders exploring side projects</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-muted-foreground text-sm ml-2">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center space-x-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>5 Free credits upon registration</span>
                </li>
                <li className="flex items-center space-x-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Basic SWOT & validation scores</span>
                </li>
                <li className="flex items-center space-x-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>Single active customer persona</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full text-center bg-secondary hover:bg-secondary/70 text-foreground font-semibold py-3 px-4 rounded-xl transition-all"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="glass-accent p-8 rounded-3xl border border-primary/30 relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-xl">
              Recommended
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Pro Tier</h3>
              <p className="text-muted-foreground text-xs mb-6">For serious startup teams and serial founders</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold">$29</span>
                <span className="text-muted-foreground text-sm ml-2">/ one-time buy</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>30 Validation credits</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>Advanced live search competitive crawling</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>Multi-persona and GTM strategies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>Downloadable professional PDF reports</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="w-full text-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.01]"
            >
              Get Pro Credits
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© 2026 Product Validator AI. Built to support founders globally.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="mailto:support@productvalidatorai.com" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
