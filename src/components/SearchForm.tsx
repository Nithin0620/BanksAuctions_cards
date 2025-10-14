'use client';

import { useState, useEffect } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import { Search, X, Filter } from 'lucide-react';

export default function SearchForm() {
    const { filters, searchFilters, setSearchFilters, loadFilters, resetFilters } = usePropertyStore();
    const [localFilters, setLocalFilters] = useState(searchFilters);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadFilters();
    }, [loadFilters]);

    useEffect(() => {
        if (localFilters.state) {
            loadFilters({ state: localFilters.state });
        }
    }, [localFilters.state, loadFilters]);

    const handleSearch = () => {
        setSearchFilters(localFilters);
        setShowFilters(false);
    };

    const handleReset = () => {
        setLocalFilters({});
        resetFilters();
    };

    const handleInputChange = (key: string, value: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            [key]: value || undefined,
        }));
    };

    return (
        <div className="w-full bg-white border-b sticky top-0 z-20 shadow-sm">
            <div className="max-w-7xl mx-auto p-4 flex flex-col gap-3">
                <div className="flex items-center w-full gap-2">
                    <input
                        placeholder="Search location..."
                        value={localFilters.query || ''}
                        onChange={(e) => handleInputChange('query', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={() => setShowFilters((prev) => !prev)}
                        className="p-2 border rounded-md md:hidden hover:bg-gray-100"
                    >
                        {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                    </button>
                </div>

                <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-6 gap-3 w-full">
                    <select
                        value={localFilters.state || ''}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All States</option>
                        {filters.states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>

                    <select
                        value={localFilters.city || ''}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!localFilters.state}
                    >
                        <option value="">All Cities</option>
                        {filters.cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <select
                        value={localFilters.property_type || ''}
                        onChange={(e) => handleInputChange('property_type', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Types</option>
                        {filters.property_types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Min Budget"
                        value={localFilters.budget_min || ''}
                        onChange={(e) => handleInputChange('budget_min', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        placeholder="Max Budget"
                        value={localFilters.budget_max || ''}
                        onChange={(e) => handleInputChange('budget_max', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleSearch}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border rounded-lg bg-gray-50">
                        <select
                            value={localFilters.state || ''}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All States</option>
                            {filters.states.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>

                        <select
                            value={localFilters.city || ''}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!localFilters.state}
                        >
                            <option value="">All Cities</option>
                            {filters.cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <select
                            value={localFilters.property_type || ''}
                            onChange={(e) => handleInputChange('property_type', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Types</option>
                            {filters.property_types.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            placeholder="Min Budget"
                            value={localFilters.budget_min || ''}
                            onChange={(e) => handleInputChange('budget_min', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm"
                        />

                        <input
                            type="number"
                            placeholder="Max Budget"
                            value={localFilters.budget_max || ''}
                            onChange={(e) => handleInputChange('budget_max', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm"
                        />

                        <button
                            onClick={handleSearch}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
                        >
                            <Search className="w-4 h-4" />
                            Apply
                        </button>

                        <button
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
