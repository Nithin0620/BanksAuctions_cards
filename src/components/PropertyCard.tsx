'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/types';
import { fetchPropertyMedia } from '@/lib/api';
import { MapPin, Calendar, Home, Building2, Share2, Heart } from 'lucide-react';
import { useShortListedStore } from "@/store/ShortListed"
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { MdOutlineAddAlert } from "react-icons/md";

import { Copy } from 'lucide-react'
import { useAlertStore } from '@/store/SeletedAlert';
import toast from "react-hot-toast"

interface PropertyCardProps {
  property: Property;
}


export default function PropertyCard({ property }: PropertyCardProps) {
  const BASE_URL = 'http://93.127.166.99:5001';
  const { toggleShortListed, shortListed } = useShortListedStore();
  const [imageUrl, setImageUrl] = useState<string>("http://93.127.166.99:5001/api/properties/100142/media/001_image_100039.jpg");
  const [imageLoaded, setImageLoaded] = useState(false);

  const [share, setShare] = useState<Number | null>(null);
  const [alert, setALert] = useState<Number | null>(null)

  const { addAlert, alerts } = useAlertStore();

  const alertData = useAlertStore();
  const alertsForId = alertData.alerts.find(a => a.id === property.id)?.selected || [];

  const alertOptions = [
    "Price Reduced to X",
    "Legal Clear",
    "Dues Clear",
    "When Phy Poss",
    "Loan Available",
  ];
  const copyElement = () => {
    navigator.clipboard.writeText(`${BASE_URL}/${share}`)
    toast.success("Link copied to clipboard")
  }



  useEffect(() => {


    const loadImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/properties/${property.id}/media`);

        const images = response.data?.data?.images;

        if (images && images.length > 0) {
          const firstImage = images[0];
          const fullUrl = `${BASE_URL}${firstImage.url}`;
          // console.log("full url i s",fullUrl)
          setImageUrl(fullUrl);
        } else {
          console.warn("No images found for property", property.id);
        }
      } catch (error) {
        console.error("Error fetching property media:", error);
      }
    };

    if (property?.id) {
      loadImage();
    }
  }, [property.id]);

  console.log("image imageUrl is", imageUrl)


  const formatPrice = (price: number | string | undefined | null) => {
    const num = Number(price);
    if (isNaN(num)) return 'N/A';
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const addToShortist = () => {
    toggleShortListed(property.id)

  }


  return (
    <div className='relative'>
      <div className="overflow-hidden shadow-md border border-gray-200 rounded-xl bg-blue-50 transition-all hover:shadow-lg">
        {true ? (
          <div className="relative w-full h-48 bg-gray-100">
            <img
              src={"https://93.127.166.99:5001/api/properties/100142/media/001_image_100039.jpg"}
              alt={property.title}
              className={`w-full h-full object-cover transition-opacity duration-500`}
              // onLoad={() => setImageLoaded(true)}
              // onError={() => setImageUrl(null)}
            />

            <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
              <button onClick={() => addToShortist()} className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
                <FaHeart className={`w-5 h-5 ${shortListed.includes(property.id) ? "text-red-500" : "text-red-200"}`} />
              </button>
              <button onClick={() => setShare(property.id)} className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
                <Share2 className="w-5 h-5 text-gray-700" />

              </button>
              <button className={`${alerts.find(a => a.id === property.id) ? 'text-yellow-500' : 'text-gray-400'}`}>
                <MdOutlineAddAlert size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-500 text-sm italic">
            No Photo Available
          </div>
        )}

        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                {property.title || 'Unnamed Property'}
              </h3>
              <div className='flex justify-evenly gap-6'>
                <div>
                  {property.locality ? property.locality : "The property locality is not listed"}
                  <p className="text-sm text-gray-600">
                    by <span className="font-medium">{property.bank_name}</span>
                  </p>
                </div>
                <div>
                  <span className="font-bold text-blue-700 text-lg text-right">
                    {formatPrice(property.reserve_price)}
                  </span>
                </div>
              </div>

            </div>

          </div>

          <div className="text-xs inline-block border text-purple-700 font-medium px-2 py-1 rounded">
            Loan Available / Other Tag
          </div>

          <div className="flex justify-between text-sm text-gray-700 border-t pt-2 mt-2">
            <div>
              <span className="block font-medium">{formatDate(property.auction_start_date)}</span>
              <span className="text-xs text-gray-500">Auction Date</span>
            </div>
            <div>
              <span className="block font-medium">{property.area || 'N/A'}</span>
              <span className="text-xs text-gray-500">Sq Ft</span>
            </div>
            <div>
              <span className="block font-medium">{property.possession || 'N/A'}</span>
              <span className="text-xs text-gray-500">Possession</span>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-medium px-3 py-1 rounded">
              View Details
            </button>
            <button onClick={() => addToShortist()} className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-medium px-3 py-1 rounded">
              Shortlist
            </button>
            <button onClick={() => setALert(property.id)} className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-medium px-3 py-1 rounded">
              Alert
            </button>
            <button onClick={() => setShare(property.id)} className="bg-green-200 hover:bg-green-300 text-gray-800 font-medium px-3 py-1 rounded">
              Share
            </button>
          </div>
        </div>

        {share ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative flex flex-col items-center gap-4">

              <button
                onClick={() => setShare(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <p className="text-lg font-medium">Share this link:</p>

              <div className="flex items-center w-full border rounded-md overflow-hidden">
                <input
                  value={`${BASE_URL}/${share}`}
                  readOnly
                  className="flex-1 p-2 outline-none"
                />
                <button
                  onClick={() => copyElement()}
                  className="p-2 bg-gray-100 hover:bg-gray-200"
                >
                  <Copy size={18} />
                </button>
              </div>

            </div>
          </div>
        ) : null}

        {alert ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative flex flex-col gap-4">

              <button
                onClick={() => setALert(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <p className="text-lg font-medium text-center">Select Alerts</p>
              <div className='h-[0.05rem] bg-black w-full'></div>
              <h1 className='flex font-bold text-[0.700rem]'>
                Alert Me Later <span className='font-light text-sm'>(This Personal Note will only be visible to you )</span>
              </h1>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {alertOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={alertsForId.includes(option)}
                      onChange={(e) => {
                        const current = alertData.alerts.find(a => a.id === alert)?.selected || [];
                        let updated: string[];
                        if (e.target.checked) {
                          updated = [...current, option];
                        } else {
                          updated = current.filter(a => a !== option);
                        }
                        alertData.addAlert({ id: alert, selected: updated });
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => setALert(null)}
                className="mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Set
              </button>
            </div>
          </div>
        ) : null}



      </div>
    </div>
  );
}
