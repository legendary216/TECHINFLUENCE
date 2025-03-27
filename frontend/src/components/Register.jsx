import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: 'candidate'
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (profilePicture) {
            data.append('profilePicture', profilePicture);
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful!');
            } else {
                setError(result.msg || 'Registration failed');
            }
        } catch (error) {
            setError('Something went wrong');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">Register Your Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" required onChange={handleChange} placeholder="Name" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <input type="email" name="email" required onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <input type="password" name="password" required onChange={handleChange} placeholder="Password" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <input type="tel" name="phoneNumber" required onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <input type="text" name="address" required onChange={handleChange} placeholder="Address" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    {profilePicture && (
                        <div className="mt-4 text-center">
                            <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" className="w-20 h-20 rounded-full mx-auto object-cover" />
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700">
                        {loading ? 'Registering...' : 'Register Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;