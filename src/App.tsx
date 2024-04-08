import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import PdfMake from "./PdfMake";
import PdfLib from "./PdfLib";
import JSPdf from "./JSPdf";
import InputJsonPdf from "./InputJsonPdf";

const routes = [{ label: 'Home', path: '/' }, { label: 'PDF Make', path: '/pdfmake' }, { label: 'PDF Lib', path: '/pdflib' }, { label: 'JS PDF', path: '/jspdf' }, { label: 'InputJSON PDF', path: '/inputjson-pdf' }]

export default function App() {
  return (
    <div>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pdfmake" element={<PdfMake />} />
          <Route path="pdflib" element={<PdfLib />} />
          <Route path="jspdf" element={<JSPdf />} />
          <Route path="inputjson-pdf" element={<InputJsonPdf />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <h1>Dynamic PDF App</h1>
        <ul>
          {
            routes.map(route => {
              const isActive = route.path === location.pathname;
              const className = isActive ? 'active' : undefined;

              return (
                <li key={route.path}>
                  <Link className={className} to={route.path}>{route.label}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div >
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
