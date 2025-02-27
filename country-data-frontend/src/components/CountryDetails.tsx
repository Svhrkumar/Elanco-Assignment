// import React from "react";

// interface Country {
//   name: string;
//   flag: string;
//   population: number;
//   languages: { [key: string]: string };
//   region: string;
//   currency: { [key: string]: { name: string; symbol: string } };
// }

// const CountryDetails: React.FC<{ country: Country }> = ({ country }) => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
//       {/* Flag */}
//       <img className="w-full h-64 object-cover" src={country.flag} alt={`Flag of ${country.name}`} />

//       {/* Country Info */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">{country.name}</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <p className="text-gray-700"><strong>Region:</strong> {country.region}</p>
//           <p className="text-gray-700"><strong>Population:</strong> {country.population.toLocaleString()}</p>

//           {/* Languages */}
//           <p className="text-gray-700 col-span-2">
//             <strong>Languages:</strong> {Object.values(country.languages).join(", ")}
//           </p>

//           {/* Currency */}
//           <p className="text-gray-700 col-span-2">
//             <strong>Currency:</strong> {Object.values(country.currency)
//               .map((c) => `${c.name} (${c.symbol})`)
//               .join(", ")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountryDetails;

import React from "react";

interface Country {
  name: string;
  flag: string;
  population: number;
  languages: { [key: string]: string };
  region: string;
  currency: { [key: string]: { name: string; symbol: string } };
}

const CountryDetails: React.FC<{ country: Country }> = ({ country }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl overflow-hidden border border-gray-300">
      {/* Flag */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover rounded-t-2xl"
          src={country.flag}
          alt={`Flag of ${country.name}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-3xl font-bold">
          {country.name}
        </div>
      </div>

      {/* Country Info */}
      <div className="p-6 space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900">{country.name}</h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
          <p>
            <strong className="text-gray-900">Region:</strong> {country.region}
          </p>
          <p>
            <strong className="text-gray-900">Population:</strong>{" "}
            {country.population.toLocaleString()}
          </p>

          {/* Languages */}
          <p className="col-span-2">
            <strong className="text-gray-900">Languages:</strong>{" "}
            {Object.values(country.languages).join(", ")}
          </p>

          {/* Currency */}
          <p className="col-span-2">
            <strong className="text-gray-900">Currency:</strong>{" "}
            {Object.values(country.currency)
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
