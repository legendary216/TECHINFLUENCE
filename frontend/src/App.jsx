
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Employee from './components/Employee.jsx';
import Employer from './components/Employer.jsx';
// name,email,password,phone,addrees, profile picture
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage /> 
    },
    {
      path: '/employee',
      element: <Employee />
    },
    {
      path: '/employer',
      element: <Employer />
    }
  ]);

  return <RouterProvider router={router} />;
}

function HomePage() {
  return (
    <div className="home">
      <div className='flex flex-col justify-center items-center text-4xl font-extrabold p-10'>
        <h1>Welcome to AI-powered</h1>
        <h1>background verification system</h1>
      </div>
      <div className='flex flex-col justify-center items-center font-bold'>
        <p>Streamline your hiring process with our advanced AI-powered solution.</p>
        <p>Whether you're an employer seeking efficient background checks or a</p>
        <p>candidate ensuring seamless verification, our system offers accuracy, speed,</p>
        <p>and transparency at every step.</p>

        <p className='mt-12'>Get started by selecting your role below</p>
      </div>
      <div className="flex mt-20 justify-center items-center gap-150">
        <Link to="/employee" className='w-64 my-4 mx-auto p-4 text-lg bg-orange-300 text-white rounded-lg 
                     hover:bg-orange-400 transition-colors duration-300 cursor-pointer block text-center'>
          Employee
        </Link>
        <Link to="/employer" className='w-64 my-4 mx-auto p-4 text-lg bg-orange-300 text-white rounded-lg 
                     hover:bg-orange-400 transition-colors duration-300 cursor-pointer block text-center'>
          Employer
        </Link>
      </div>
    </div>
  );
}

export default App;