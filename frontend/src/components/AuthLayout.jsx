const AuthLayout = ({ eyebrow, title, description, highlights, footer, children }) => {
  return (
    <section className="app-section">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <aside className="panel-strong grid-lines relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-x-8 top-0 h-40 rounded-b-[40px] bg-gradient-to-b from-blue-100/80 to-transparent blur-2xl" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="page-eyebrow">{eyebrow}</p>
              <div className="space-y-4">
                <h1 className="section-title max-w-xl">{title}</h1>
                <p className="section-copy max-w-xl">{description}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="soft-card">
                  <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/70 px-5 py-4 text-sm text-slate-600">
              {footer}
            </div>
          </div>
        </aside>

        <div className="panel-strong self-center p-6 sm:p-8 md:p-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
