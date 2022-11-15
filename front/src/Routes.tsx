import { Routes, Route} from 'react-router-dom';
import { DashBoard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { UserCreate } from './pages/UserCreate';
import { UserList } from './pages/UserList';

export function Router(){
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserCreate />} />
        </Routes>
    )
}