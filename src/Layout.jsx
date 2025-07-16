import { Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersCards from "./pages/Admin/UsersCards"
import Connections from "./pages/Admin/Connections"
import MemberDashboard from './pages/Member/MemberDashboard';
import Profile from "./pages/Member/Profile"
import MyConnections from "./pages/Member/MyConnections"
import General from "./pages/Member/General"
import Jobs from "./pages/Member/Jobs"
import Community from "./pages/Member/Community"
import User from "./pages/Admin/User";
import Events from "./pages/Admin/Events";
import NewEvent from "./pages/Admin/NewEvent";

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={<AdminDashboard />}>
                <Route path="users" element={<UsersCards />} />
                <Route path="users/:id" element={<User />} />
                <Route path="events" element={<Events />} />
                <Route path="events/new" element={<NewEvent />} />
                <Route path="connections" element={<Connections />} />
            </Route>

            <Route path="/members" element={<MemberDashboard />}>
                {/* <Route path="profile" element={<Profile />} > */}
                <Route path="general" element={<General />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="community" element={<Community />} />
                {/* </Route> */}
                <Route path="myConnections" element={<MyConnections />} />
            </Route>
        </Routes>
    );
}

export default Layout