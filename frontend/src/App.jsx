import {
BrowserRouter,
Routes,
Route
}
from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import CGPA from './pages/CGPA'
import Analytics from './pages/Analytics'
import Admin from './pages/Admin'

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/attendance"
element={<Attendance/>}
/>

<Route
path="/cgpa"
element={<CGPA/>}
/>

<Route
path="/analytics"
element={<Analytics/>}
/>

<Route
path="/admin"
element={<Admin/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App