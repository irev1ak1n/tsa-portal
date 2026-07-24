import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Icon } from '../components/UI.jsx';

const OFFICIAL = {
    home: 'https://tsaweb.org',
    students: 'https://tsaweb.org/students',
    competitions: 'https://tsaweb.org/competitions',
};

function RowLink({ icon, title, desc, to, href }) {
    const inner = (
        <>
      <span className="rs-ico">
        <Icon name={icon} size={20} />
      </span>
            <span className="rs-text">
        <span className="rs-title">{title}</span>
                {desc && <span className="rs-desc">{desc}</span>}
      </span>
            <Icon name="chevron-right" size={18} />
        </>
    );

    if (to) {
        return (
            <Link className="rs-row" to={to}>
                {inner}
            </Link>
        );
    }
    return (
        <a className="rs-row" href={href} target="_blank" rel="noreferrer">
            {inner}
        </a>
    );
}

export default function Resources() {
    const { profile } = useApp();
    const state = profile?.state;

    return (
        <>
            <div className="section">
                <h1>Resources</h1>
                <p className="muted small" style={{ margin: 0 }}>
                    Your coach, the official rules, and your state's TSA.
                </p>
            </div>

            <div className="rs-group-label">Get help</div>
            <div className="rs-card">
                <RowLink
                    icon="spark"
                    title="AI Competition Coach"
                    desc="Ask about your events, rules, and team limits"
                    to="/coach"
                />
            </div>

            <div className="rs-group-label">Official rules</div>
            <div className="rs-card">
                <RowLink
                    icon="grid"
                    title="Events & eligibility"
                    desc="All official events for your division, with team sizes"
                    to="/events"
                />
                <RowLink
                    icon="file-text"
                    title="Competition Guide"
                    desc="The official rules on tsaweb.org"
                    href={OFFICIAL.competitions}
                />
            </div>

            <div className="rs-group-label">{state ? `Your state · ${state}` : 'Your state'}</div>
            <div className="rs-card">
                <RowLink
                    icon="globe"
                    title="State delegations"
                    desc={state ? `Find ${state}'s delegation on tsaweb.org` : 'Find your delegation on tsaweb.org'}
                    href={OFFICIAL.students}
                />
            </div>
            <p className="rs-note">
                Delegation contacts and state conference dates aren't built in yet. They change every season, so they need to
                come from TSA's official data rather than being typed in by hand.
            </p>

            <div className="rs-group-label">TSA</div>
            <div className="rs-card">
                <RowLink icon="home" title="tsaweb.org" desc="The official TSA website" href={OFFICIAL.home} />
                <RowLink icon="users" title="For students" desc="Programs, leadership, and resources" href={OFFICIAL.students} />
            </div>

            <p className="rs-note">
                TSA Hub is a student-built tool. It isn't an official TSA product, and it doesn't grant TSA membership — that
                happens through your school chapter and advisor.
            </p>
        </>
    );
}