import { ArrowRight, BadgeCheck, Briefcase, CheckCircle2, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const App = () => {
  const { user } = useAuth();

  const featureCards = [
    {
      title: 'Secure team workflows',
      description: 'JWT-based access, protected routes, and role-aware controls keep the right people in the right spaces.',
      icon: ShieldCheck
    },
    {
      title: 'Task visibility that stays clear',
      description: 'Track task progress and priority with a layout that makes the next action obvious.',
      icon: LayoutDashboard
    },
    {
      title: 'Operational insight for admins',
      description: 'Review platform activity, user access, and completion trends from a focused admin overview.',
      icon: Briefcase
    }
  ];

  const proofPoints = [
    'Protected dashboard and admin routing',
    'CRUD task management with priority and status',
    'Clear API-driven validation and feedback'
  ];

  const primaryCta = user ? '/dashboard' : '/register';
  const primaryLabel = user ? 'Open workspace' : 'Launch your workspace';
  const secondaryCta = user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login';

  return (
    <div className="space-y-8 pb-6">
      <section className="app-section">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              Professional task operations for secure teams
            </div>

            <div className="space-y-5">
              <p className="page-eyebrow">PrimeTrade Assignment Frontend</p>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Turn backend capability into a workspace people actually enjoy using.
              </h1>
              <p className="section-copy max-w-2xl">
                This React interface wraps authentication, task CRUD, and admin visibility in a cleaner SaaS-style experience with stronger hierarchy, calmer feedback, and better daily flow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" to={primaryCta}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="btn-secondary" to={secondaryCta}>
                {user ? 'View account area' : 'Sign in'}
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div key={item} className="soft-card flex items-start gap-3">
                  <span className="mt-0.5 rounded-full bg-emerald-50 p-2 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong grid-lines relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-teal-200/40 blur-3xl" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between rounded-3xl border border-white/70 bg-white/80 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Workspace health</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">92%</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  On track
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="soft-card">
                  <p className="text-sm font-semibold text-slate-500">Priority focus</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">7 active items</p>
                  <p className="mt-2 text-sm text-slate-600">A dashboard built to keep pending work visible without feeling noisy.</p>
                </div>
                <div className="soft-card">
                  <p className="text-sm font-semibold text-slate-500">Admin clarity</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">Role-aware views</p>
                  <p className="mt-2 text-sm text-slate-600">Separate user and admin experiences with consistent navigation and feedback.</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200/10 bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/15">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Task preview</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">What teams see next</h2>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">Focused UI</span>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    ['Audit admin users', 'In progress', 'high'],
                    ['Prepare API handoff notes', 'Pending', 'medium'],
                    ['Review completed tasks', 'Completed', 'low']
                  ].map(([title, status, priority]) => (
                    <div key={title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="mt-1 text-sm text-slate-300">{status}</p>
                      </div>
                      <span className="badge bg-white/10 text-blue-100">{priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-section">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="page-eyebrow">Core benefits</p>
            <h2 className="section-title">A cleaner layer on top of the existing API contract.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            The frontend stays light on dependencies and heavy on clarity: reusable surfaces, better spacing, polished auth, and dashboard-first workflows.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="card">
              <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
