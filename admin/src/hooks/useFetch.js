/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'http://localhost:5000/api' });


// this File call from ==> 
// 1) ../pages/Login 🟨 <Components />
// 2) ../pages/NewUser 🟨 <Components />
// 3) ../pages/NewRoom 🟨 <Components />
// 4) ../pages/NewHotel 🟨 <Components />
// 5) ../components/DataTable 🟨 <Components />

const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(endPoint);
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [endPoint]);


    const reFetchData = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(endPoint);
            setData(data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { data, loading, error, reFetchData };
}



// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 REST api Section...🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
export const userDataTable = (path) => useFetch(path);
export const allHotels = () => useFetch('/hotels');
export const allRooms = () => useFetch('/rooms');
export const getUser = (id) => useFetch('/users/' + id);

export const dataDelete = (pathWithId) => api.delete(pathWithId);

export const sign_in = (credentials) => api.post('/auth/sign-in', credentials);
export const creatingNewUser = (newUserInfo) => api.post('/auth/sign-up', newUserInfo);
export const creatingNewHotel = (newHotel) => api.post('/hotels', newHotel);
export const creatingNewRoom = (hotelId, totalRoomInfo) => api.post(`/rooms/${hotelId}`, totalRoomInfo);



const imageHostingUrl = 'https://api.cloudinary.com/v1_1/taiseen/image/upload';
export const imageUpload = (imgFile) => axios.post(imageHostingUrl, imgFile);
