
import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMembersModal from './components/Modals/InviteMembersModal';
import EditProfile from './components/Profile/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<ChatRoom/>}/>
              <Route path="/editprofile" element={<EditProfile/>}/>
            </Routes>
            <AddRoomModal/>
            <InviteMembersModal/>
          </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
