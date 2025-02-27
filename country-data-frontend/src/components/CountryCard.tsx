import { FC } from "react"
import { FaRegClock } from "react-icons/fa";

interface Country {
    name: string;
    flag: string;
    region: string;
    capital?: string; 
    localTime?: string;
    code?: string;
  }

interface CountryCardProp{
    country:Country
    handleDetails:(value:string) => void
}
const CountryCard :FC<CountryCardProp> =  ({country,handleDetails}) => {


    return(
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex justify-between items-center cursor-pointer" onClick={() => handleDetails(country?.code)}> 
             {country?.flag ? (
                <img
                  className="w-10 h-10 object-cover"
                  src={country?.flag}
                  alt={`Flag of ${country?.name}`}
                />
              ) : (
                <p className="text-center">No Flag Available</p>
              )}

              <div className="mt-2 text-center">
                <h2>{country?.name}</h2>
                <p>{country?.region}</p>
              </div>
              <div className="mt-2 flex flex-col items-center">
               <FaRegClock className="text-center"/>
              <p>{country?.localTime}</p>
              </div>
        </div>
    )
}

export default CountryCard


 
  