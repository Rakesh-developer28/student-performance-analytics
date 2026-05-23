import {
FaChartLine,
FaCalendarAlt,
FaFileAlt,
FaHeartbeat,
FaGraduationCap,
FaArrowTrendUp
}

from "react-icons/fa6"

import { Link }
from "react-router-dom"

function Sidebar(){

const item=
`
flex
items-center
gap-4
px-6
py-4
rounded-2xl
hover:bg-gray-100
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
flex
flex-col
justify-between
">

<div>

<div className="
p-8
border-b
flex
gap-4
items-center
">

<div className="
w-14
h-14
bg-black
rounded-2xl
text-white
flex
justify-center
items-center
">

<FaGraduationCap/>

</div>

<div>

<h1 className="
font-bold
text-xl
">

EduPredict

</h1>

<p className="
text-gray-500
">

Student portal

</p>

</div>

</div>

<div className="
p-6
space-y-3
">

<Link
to="/dashboard"
className={item}
>

<FaTableCellsLarge/>

Dashboard

</Link>

<Link
to="/analytics"
className={item}
>

<FaChartLine/>

Analytics

</Link>

<Link
to="/attendance"
className={item}
>

<FaCalendarAlt/>

Leaves

</Link>

<Link
className={item}
>

<FaFileAlt/>

Reports

</Link>

</div>

</div>

<div className="
p-6
border-t
">

<p className="
font-semibold
">

Kevin

</p>

<p className="
text-gray-500
mb-5
">

Computer Science · Sem 1

</p>

<button className="
w-full
border
rounded-2xl
p-4
flex
items-center
gap-4
justify-center
">

<FaArrowRightFromBracket/>

Sign out

</button>

</div>

</div>

)

}

export default Sidebar