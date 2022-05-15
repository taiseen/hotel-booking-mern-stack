import { useEffect, useState } from 'react';
import api from './baseURL';


// this function call from 🟨 ../page/Hotel 🟨 <Components />
// this function call from 🟨 ../page/HotelList 🟨 <Components />
// this function call from 🟨 ../components/Featured 🟨 <Components />
// this function call from 🟨 ../components/PropertyList 🟨 <Components />
// this function call from 🟨 ../components/FeaturedProperties 🟨 <Components />
const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // const url = baseUrl + endPoint;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(endPoint);
                setData(res.data);
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
            const res = await api.get(endPoint);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { data, loading, error, reFetchData };
}

export default useFetch;