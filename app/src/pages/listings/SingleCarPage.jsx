import {useState,useEffect} from 'react'
import SingleCar from "../dashboard/SingleCar"
import CarDetails from "../dashboard/SingleCarDetails"
import { useParams } from 'react-router-dom'
import api from '../../services/axios'



function SingleCarPage() {
  const {id} = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [carImages, setCarImages] = useState([]);
  useEffect(()=>{
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/cardetails/${id}`);
        if(res.data.success){
          setCarDetails(res.data.cardetails)
          setCarImages(res.data.carimageurls)
        }
      } catch (error) {
        console.error("an unexpected error occured", error)
      }
    }
    fetchDetails();
  },[id])
  return (
    <>
    <div className='mt-14'><SingleCar images={carImages}/></div>

    <div><CarDetails cardetails={carDetails} /></div>
    </>
  )
}

export default SingleCarPage