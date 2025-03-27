import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("candidate");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 
    // Handle profile picture upload
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setProfilePicture(file);

        // Upload image to backend
        const imageData = new FormData();
        imageData.append("profilePicture", file);

        try {
            const uploadResponse = await fetch("http://localhost:5000/api/auth/upload-profile", {
                method: "POST",
                body: imageData,
            });

            const uploadResult = await uploadResponse.json();
            if (uploadResponse.ok) {
                setProfileImageUrl(uploadResult.profilePictureUrl); // Store uploaded image URL
            } else {
                setError(uploadResult.msg || "Image upload failed");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            setError("Failed to upload image");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Create JSON payload (without FormData)
        const userData = {
            name,
            email,
            password,
            phoneNumber,
            address,
            role,
            profilePicture: profileImageUrl, // Store URL, not file
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log(result);

            // if (response.ok) {
            //     alert("Registration successful!");
            // } else {
            //     setError(result.msg || "Registration failed");
            // }
            if (response.ok) {
                alert("Registration successful!");
                navigate("/"); // Navigate to Login page
            } else {
                setError(result.msg || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">Register Your Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    {/* <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white">
                        <option value="candidate">Candidate</option>
                        <option value="employer">Employer</option>
                    </select> */}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white" />
                    
                    {/* Show profile picture preview */}
                    {profilePicture && (
                        <div className="mt-4 text-center">
                            <img src={URL.createObjectURL(profilePicture)} alt="Profile Preview" className="w-20 h-20 rounded-full mx-auto object-cover" />
                        </div>
                    )}

                    {/* Show uploaded profile image from server */}
                    {profileImageUrl && (
                        <div className="mt-4 text-center">
                            <p className="text-green-400">Profile uploaded!</p>
                            <img src={`http://localhost:5000${profileImageUrl}`} alt="Uploaded Profile" className="w-20 h-20 rounded-full mx-auto object-cover" />
                        </div>
                    )}

                    <button type="submit" disabled={loading} className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700">
                        {loading ? "Registering..." : "Register Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
