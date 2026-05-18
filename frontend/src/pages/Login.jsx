import { useNavigate }
from 'react-router-dom'

function Login(){

const nav=
useNavigate()

return(

<div className="
h-screen
bg-[#f5f6fa]
flex
justify-center
items-center
">

<div className="
bg-white
p-10
rounded-3xl
w-[420px]
shadow
">

<h1 className="
text-4xl
font-bold
mb-6
">

StudentAI

</h1>

<input
placeholder="Email"

className="
w-full
p-4
mb-4
bg-gray-100
rounded-xl
"
/>

<input
placeholder="Password"

type="password"

className="
w-full
p-4
mb-4
bg-gray-100
rounded-xl
"
/>

<button

onClick={()=>
nav(
'/dashboard'
)
}

className="
w-full
bg-blue-600
text-white
p-4
rounded-xl
"

>

Login

</button>

</div>

</div>

)

}

export default Login