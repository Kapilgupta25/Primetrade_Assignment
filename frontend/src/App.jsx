import { Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Backend Intern Assignment</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Secure REST API with React UI</h1>
            <p className="mt-5 text-lg text-slate-600">JWT authentication, role-based access, task CRUD, validation, secure middleware, MongoDB schema, and Postman collection.</p>
            <div className="mt-8 flex gap-3">
              <Link className="btn" to="/register">Get Started</Link>
              <Link className="rounded-lg border border-slate-300 px-4 py-2 font-medium" to="/login">Login</Link>
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-bold">Features</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✅ Register and login users</li>
              <li>✅ JWT protected dashboard</li>
              <li>✅ User/Admin roles</li>
              <li>✅ Create, read, update, delete tasks</li>
              <li>✅ API validation and error handling</li>
              <li>✅ Postman collection included</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
