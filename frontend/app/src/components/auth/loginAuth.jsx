import axios from "axios";  
const lodinUrl = "http://localhost:5000/api/login";
const getuserDetailsUrl = 'http://localhost:5000/api/user/details';

export const login = async (email, password) => {   
    try {
        const response = await axios.post(lodinUrl, { email, password });
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("role", response.data.role);
        
        return response.data; 
    }catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const getuserDetails = async ()=>{
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    try{
        const response=await axios.get(getuserDetailsUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }catch (error){
        console.error("Error fetching user details:", error);
        throw error;    
    }
}