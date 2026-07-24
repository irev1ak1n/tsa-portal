import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Login from './screens/Login.jsx';
import Onboarding from './screens/Onboarding.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Events from './screens/Events.jsx';
import EventDetail from './screens/EventDetail.jsx';
import Recommender from './screens/Recommender.jsx';
import Resources from './screens/Resources.jsx';
import Coach from './screens/Coach.jsx';
import Chats from './screens/Chats.jsx';
import NewMessage from './screens/NewMessage.jsx';
import ChatThread from './screens/ChatThread.jsx';
import Team from './screens/Team.jsx';
import Profile from './screens/Profile.jsx';
import Settings from './screens/Settings.jsx';
import AccountPrivacy from './screens/AccountPrivacy.jsx';

function Loading() {
    return (
        <div className="auth-wrap">
            <p className="muted">Loading…</p>
        </div>
    );
}

function RequireProfile({ children }) {
    const { profile, profileLoading } = useApp();
    if (profileLoading) return <Loading />;
    if (!profile) return <Navigate to="/onboarding" replace />;
    return children;
}

function OnboardingRoute() {
    const { profileLoading } = useApp();
    if (profileLoading) return <Loading />;
    return <Onboarding />;
}

function Gate() {
    const { session, loading } = useAuth();

    if (loading) return <Loading />;
    if (!session) return <Login />;

    return (
        <Routes>
            <Route path="/onboarding" element={<OnboardingRoute />} />
            <Route
                element={
                    <RequireProfile>
                        <Layout />
                    </RequireProfile>
                }
            >
                <Route path="/" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/recommend" element={<Recommender />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/coach" element={<Coach />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/privacy" element={<AccountPrivacy />} />

                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/new" element={<NewMessage />} />
                <Route path="/chats/:id" element={<ChatThread />} />
                <Route path="/team" element={<Team />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <BrowserRouter>
                    <Gate />
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    );
}