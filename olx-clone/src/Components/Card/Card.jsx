import React from "react";
import { Link } from "react-router-dom";

function Card({ items }) {
  return (
    <div className="w-full px-4 md:px-10 py-8">
      <h1 className="text-3xl font-semibold mb-6">Fresh Recommendations</h1>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item, index) => (
            <Link to={`/details/${item.id}`}>
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-2xl font-bold mb-2">
                      ₹ {new Intl.NumberFormat("en-IN").format(item.price)}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No products found. Be the first to post an ad!
          </p>
        </div>
      )}
    </div>
  );
}

export default Card;
