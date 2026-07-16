import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Onboarding from './screens/Onboarding.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Events from './screens/Events.jsx';
import EventDetail from './screens/EventDetail.jsx';
import Recommender from './screens/Recommender.jsx';
import Coach from './screens/Coach.jsx';
import Chats from './screens/Chats.jsx';
import NewMessage from './screens/NewMessage.jsx';
import ChatThread from './screens/ChatThread.jsx';
import Team from './screens/Team.jsx';
import Profile from './screens/Profile.jsx';

function RequireProfile({ children }) {
    const { profile } = useApp();
    if (!profile) return <Navigate to="/onboarding" replace />;
    return children;
}

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/onboarding" element={<Onboarding />} />
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
                        <Route path="/chats" element={<Chats />} />
                        <Route path="/chats/new" element={<NewMessage />} />
                        <Route path="/chats/:id" element={<ChatThread />} />
                        <Route path="/coach" element={<Coach />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}