'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, LayoutDashboard, PlusCircle, History, User, LogOut, ArrowRight, BarChart2, ShieldAlert, Award, FileText } from 'lucide-react';

export default function DashboardPage() {
  const [mockReports, setMockReports] = useState([
    { id: '1', title: 'Uber for Clean Water', industry: 'Logistics / Clean Tech', score: 82, date: 'July 5, 2026', status: 'ready' },
    { id: '2', title: 'AI Personal Stylist', industry: 'E-commerce / AI', score: 64, date: 'July 3, 2026', status: 'ready' },
    { id: '3', title: 'Decarbonized Delivery', industry: 'Transportation', score: 78, date: 'July 1, 2026', status: 'ready' },
  ]);

  return (
    <div className="flex-1 flex min-h-screen bg-background relative">
      {/* Side Ambient Glow */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-base tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Product Validator AI
            </span>
          </Link>

          <nav className="space-y-1.5">
            <Link href="/dashboard" className="flex items-center space-x-3 text-sm font-medium bg-primary/10 text-primary px-4 py-3 rounded-xl transition-all">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
              <PlusCircle className="w-4 h-4" />
              <span>Validate New Idea</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
              <History className="w-4 h-4" />
              <span>Audit Trail</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          <Link href="/" className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and evaluate your startup concepts</p>
          </div>
          <button className="flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-medium px-4 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.01]">
            <PlusCircle className="w-4 h-4" />
            <span className="text-sm">Validate Idea</span>
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Remaining Credits
              </span>
              <span className="text-3xl font-extrabold">5</span>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Submissions
              </span>
              <span className="text-3xl font-extrabold">{mockReports.length}</span>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Highest Score
              </span>
              <span className="text-3xl font-extrabold">82<span className="text-sm text-muted-foreground font-normal">/100</span></span>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Submissions Section */}
        <section className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-lg font-bold">Recent Idea Validations</h2>
            <Link href="#" className="text-xs text-primary hover:underline font-semibold flex items-center space-x-1">
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {mockReports.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center text-muted-foreground">
              <ShieldAlert className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm">You haven't submitted any startup ideas yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {mockReports.map((report) => (
                <div key={report.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-all">
                  <div>
                    <h3 className="font-semibold text-base text-foreground">{report.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                      <span>{report.industry}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block">Score</span>
                      <span className={`text-base font-bold ${report.score >= 80 ? 'text-green-500' : report.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {report.score}/100
                      </span>
                    </div>
                    <button className="flex items-center space-x-1.5 bg-secondary hover:bg-secondary/70 text-foreground px-3.5 py-2 rounded-lg border border-white/5 transition-all text-xs font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
