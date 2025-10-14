'use client';
import { useEffect } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import PropertyCard from './PropertyCard';
import PaginationControls from './PaginationControls';
import { Loader2 } from 'lucide-react';

export default function PropertyListingPage() {
  const { properties, loading, error, loadProperties } = usePropertyStore();

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // console.log("prossds",properties);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button
            onClick={() => loadProperties()}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-xl font-medium">No properties found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </div>
      <PaginationControls 
      />
    </div>
  );
}
