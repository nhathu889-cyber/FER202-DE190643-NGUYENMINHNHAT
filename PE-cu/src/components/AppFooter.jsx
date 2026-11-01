import { about } from '../data/about';

function AppFooter() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <img src={about.logo} alt={about.appName} width="40" height="40" className="rounded-circle" />
          <div>
            <div className="fw-semibold">{about.appName}</div>
            <small>{about.copyright}</small>
          </div>
        </div>
        <div className="text-md-end">
          <div>{about.version}</div>
          <small>{about.course}</small>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
