import Sidebar from './Sidebar'

function Layout({
title,
children
}){

return(

<div className="
min-h-screen
bg-[#f5f6fa]
flex
">

<Sidebar/>

<div className="
flex-1
ml-[300px]
p-8
">

<div className="
flex
justify-between
items-center
mb-8
">

<h1 className="
text-5xl
font-bold
">

{title}

</h1>

<input

placeholder="Search..."

className="
w-[380px]
bg-white
rounded-2xl
px-6
py-4
shadow-sm
outline-none
"

/>

</div>

{children}

</div>

</div>

)

}

export default Layout