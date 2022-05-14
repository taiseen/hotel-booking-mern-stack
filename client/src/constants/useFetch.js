import { useEffect, useState } from 'react';
import axios from "axios";

// this function call from 🟨 ../components/Featured 🟨 <Components />
// this function call from 🟨 ../components/PropertyList 🟨 <Components />
// this function call from 🟨 ../components/FeaturedProperties 🟨 <Components />
const useFetch = (endPoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const url = 'http://localhost:5000/api/' + endPoint;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);


    const reFetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return { data, loading, error, reFetchData };
}

export default useFetch;