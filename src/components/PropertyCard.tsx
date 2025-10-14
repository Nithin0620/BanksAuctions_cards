'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/types';
import { fetchPropertyMedia } from '@/lib/api';
import { MapPin, Calendar, Home, Building2, Share2, Heart } from 'lucide-react';
import { Card } from './ui/card';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const media = await fetchPropertyMedia(property.id);
      if (media.images && media.images.length > 0) {
        const fullUrl = `http://93.127.166.99:5001${media.images[0].url}`;
        setImageUrl(fullUrl);
      }
    };
    loadImage();
  }, [property.id]);

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

  return (
    <Card className="overflow-hidden shadow-md border border-gray-200 rounded-xl bg-blue-50 transition-all hover:shadow-lg">
      {/* ======== Top Photo Section ======== */}
      {imageUrl ? (
        <div className="relative w-full h-48 bg-gray-100">
          <img
            src={imageUrl}
            alt={property.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageUrl(null)}
          />

          {/* Heart and Share buttons */}
          <div className="absolute top-2 right-2 flex flex-col items-center gap-2">
            <button className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
              <Heart className="w-5 h-5 text-red-500" />
            </button>
            <button className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-500 text-sm italic">
          No Photo Available
        </div>
      )}

      {/* ======== Info Section ======== */}
      <div className="p-4 space-y-3">
        {/* Title & Price Row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
              {property.title || 'Unnamed Property'}
            </h3>
            <p className="text-sm text-gray-600">
              by <span className="font-medium">{property.bank_name}</span>
            </p>
          </div>
          <span className="font-bold text-blue-700 text-lg text-right">
            {formatPrice(property.reserve_price)}
          </span>
        </div>

        {/* Loan Tag */}
        <div className="text-xs inline-block bg-purple-100 text-purple-700 font-medium px-2 py-1 rounded">
          Loan Available / Other Tag
        </div>

        {/* Property Details Row */}
        <div className="grid grid-cols-3 text-sm text-gray-700 border-t pt-2 mt-2">
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

        {/* Buttons */}
        <div className="flex justify-between mt-3">
          <button className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-medium px-3 py-1 rounded">
            View Details
          </button>
          <button className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-medium px-3 py-1 rounded">
            Shortlist
          </button>
          <button className="bg-green-200 hover:bg-green-300 text-gray-800 font-medium px-3 py-1 rounded">
            Share
          </button>
        </div>
      </div>
    </Card>
  );
}
