import { Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersCards from "./pages/Admin/UsersCards"
import Connections from "./pages/Admin/Connections"
import MemberDashboard from './pages/Member/MemberDashboard';
import Profile from "./pages/Member/Profile"
import MyConnections from "./pages/member/MyConnections"

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<div>בחר פעולה מצד שמאל</div>} />     
                <Route path="users" element={<UsersCards />} />
                <Route path="connections" element={<Connections />} />
            </Route>

            <Route path="/members" element={<MemberDashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="myConnections" element={<MyConnections />} />
            </Route>
        </Routes>
    );
}

export default Layout