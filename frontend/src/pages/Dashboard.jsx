import Layout from '../components/Layout'

import {

ResponsiveContainer,
AreaChart,
Area,
XAxis,
YAxis,
Tooltip,
CartesianGrid,

PieChart,
Pie,
Cell

}

from 'recharts'

const analyticsData=[

{
sem:"Sem1",
cgpa:6.2
},

{
sem:"Sem2",
cgpa:6.8
},

{
sem:"Sem3",
cgpa:7.4
},

{
sem:"Sem4",
cgpa:8.1
},

{
sem:"Sem5",
cgpa:8.6
}

]

const predictionData=[

{
name:"Accuracy",
value:68
},

{
name:"Remaining",
value:32
}

]

function Dashboard(){

return(

<Layout title="Overview">

<div className="
space-y-6
">

{/* TOP CARDS */}

<div className="
grid
grid-cols-3
gap-6
mb-8
">

<Card
title="Students"
value="120"
growth="+12%"
icon="👥"
/>

<Card
title="Attendance"
value="92%"
growth="+8%"
icon="✅"
/>

<Card
title="CGPA"
value="8.2"
growth="+4%"
icon="🎓"
/>

</div>

{/* ANALYTICS */}

<div className="
bg-white
rounded-3xl
p-8
shadow-sm
mb-8
">

<div className="
flex
justify-between
mb-6
">

<h2 className="
text-2xl
font-semibold
">

Analytics

</h2>

<div className="
flex
gap-3
">

<Tag text="Yearly"/>

<Tag text="Monthly"/>

<Tag text="Weekly"/>

</div>

</div>

<div className="
h-[450px]
">

<ResponsiveContainer>

<AreaChart
data={analyticsData}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="sem"
/>

<YAxis/>

<Tooltip/>

<Area

type="monotone"

dataKey="cgpa"

stroke="#3b82f6"

fill="#dbeafe"

/>

</AreaChart>

</ResponsiveContainer>

</div>

</div>

{/* TOP STUDENTS */}

<div className="
bg-white
rounded-3xl
p-8
shadow-sm
mb-8
">

<h2 className="
text-2xl
font-semibold
mb-6
">

Top Students

</h2>

<div className="
grid
grid-cols-2
gap-5
">

<Student
name="Kevin"
cgpa="8.7"
/>

<Student
name="Alex"
cgpa="8.5"
/>

<Student
name="John"
cgpa="8.2"
/>

<Student
name="Francis"
cgpa="8.1"
/>

</div>

</div>

{/* PREDICTION */}

<div className="
bg-white
rounded-3xl
p-8
shadow-sm
text-center
">

<h2 className="
text-2xl
font-semibold
mb-6
">

Prediction Accuracy

</h2>

<div className="
h-[300px]
">

<ResponsiveContainer>

<PieChart>

<Pie

data={predictionData}

innerRadius={80}

outerRadius={110}

dataKey="value"

>

<Cell fill="#ec4899"/>

<Cell fill="#e5e7eb"/>

</Pie>

</PieChart>

</ResponsiveContainer>

</div>

<h1 className="
text-5xl
font-bold
">

68%

</h1>

<p className="
text-gray-500
mt-3
">

Prediction Rate

</p>

</div>

{/* TABLE */}

<div className="
bg-white
rounded-3xl
p-8
shadow-sm
">

<div className="
flex
justify-between
mb-6
">

<h2 className="
text-2xl
font-semibold
">

Student Performance

</h2>

<button className="
bg-blue-500
text-white
px-5
py-3
rounded-xl
">

Export PDF

</button>

</div>

<table className="
w-full
">

<thead>

<tr className="
border-b
text-gray-500
">

<th>Name</th>

<th>Semester</th>

<th>Attendance</th>

<th>CGPA</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<Row
name="Kevin"
sem="5"
att="92%"
cgpa="8.4"
/>

<Row
name="Alex"
sem="5"
att="89%"
cgpa="8.1"
/>

<Row
name="John"
sem="4"
att="95%"
cgpa="8.7"
/>

<Row
name="Francis"
sem="5"
att="91%"
cgpa="8.2"
/>

</tbody>

</table>

</div>

</div>

</Layout>

)

}

function Card({
title,
value,
growth,
icon
}){

return(

<div className="
bg-white
rounded-3xl
p-7
shadow-sm
flex
items-center
gap-5
">

<div className="
w-20
h-20
rounded-full
bg-blue-100
flex
items-center
justify-center
text-4xl
">

{icon}

</div>

<div>

<p className="
text-gray-500
">

{title}

</p>

<h1 className="
text-5xl
font-bold
my-2
">

{value}

</h1>

<span className="
text-green-500
">

{growth}

</span>

</div>

</div>

)

}

function Student({
name,
cgpa
}){

return(

<div className="
flex
justify-between
items-center
p-5
bg-gray-50
rounded-2xl
">

<div className="
flex
items-center
gap-4
">

<div className="
w-14
h-14
rounded-full
bg-blue-100
"/>

{name}

</div>

{cgpa}

</div>

)

}

function Row({
name,
sem,
att,
cgpa
}){

return(

<tr className="
h-16
border-b
">

<td>{name}</td>

<td>{sem}</td>

<td>{att}</td>

<td>{cgpa}</td>

<td>

<span className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
">

Good

</span>

</td>

</tr>

)

}

function Tag({text}){

return(

<div className="
bg-gray-100
px-5
py-2
rounded-xl
">

{text}

</div>

)

}

export default Dashboard