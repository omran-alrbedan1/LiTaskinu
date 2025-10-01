import { images } from "@/constants/images";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiHeartFullOutline } from "react-icons/ti";

const PersonCard = ({ person }: { person: Person }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 bg-primary-color1 rounded-full flex items-center justify-center flex-shrink-0">
          <Image
            src={person.image || images.Unknown}
            height={44}
            width={44}
            alt={person.name}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 truncate">
              {person.name}
            </h3>
            <Heart className="w-4 h-4 text-pink-400 flex-shrink-0 ml-2" />
          </div>
          <div className="text-sm text-gray-600 space-y-1 mt-2">
            <p>Age: {person.age}</p>
            <p>City: {person.city}</p>
            <p>Social Status: {person.status}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="w-fit bg-primary-color1 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center">
          <TiHeartFullOutline className="w-4 h-4 text-white" />
        </button>
        <Link
          href={`./persons/${person.id}`}
          className="flex-1 text-white bg-primary-color1 py-2 px-3 rounded-lg text-xs font-bold transition-colors text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;
