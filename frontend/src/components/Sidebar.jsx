import {
FaHome,
FaClipboardCheck,
FaChartLine,
FaChartBar,
FaUserShield,
FaCog
}
from 'react-icons/fa'

import { Link }
from 'react-router-dom'

function Sidebar(){

const item=
`
flex
items-center
gap-4
px-5
py-4
rounded-2xl
hover:bg-blue-50
`

return(

<div className="
fixed
left-0
top-0
w-[260px]
h-screen
bg-white
border-r
p-8
z-50
">

<h1 className="
text-6xl
font-bold
mb-12
">

StudentAI

</h1>

<div className="
space-y-3
">

<Link
to="/dashboard"
className={item}
>

<FaHome/>

Overview

</Link>

<Link
to="/attendance"
className={item}
>

<FaClipboardCheck/>

Attendance

</Link>

<Link
to="/cgpa"
className={item}
>

<FaChartLine/>

CGPA

</Link>

<Link
to="/analytics"
className={item}
>

<FaChartBar/>

Analytics

</Link>

<Link
to="/admin"
className={item}
>

<FaUserShield/>

Admin

</Link>

<Link className={item}>

<FaCog/>

Settings

</Link>

</div>

</div>

)

}

export default Sidebar