'use client';

import { useState, useEffect } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function SearchForm() {
    const { filters, searchFilters, setSearchFilters, loadFilters, resetFilters } = usePropertyStore();
    const [localFilters, setLocalFilters] = useState(searchFilters);

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
        <div className="w-full bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Input
                        placeholder="Search location..."
                        value={localFilters.query || ''}
                        onChange={(e) => handleInputChange('query', e.target.value)}
                        className="w-full"
                    />

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

                    <Input
                        type="number"
                        placeholder="Min Budget"
                        value={localFilters.budget_min || ''}
                        onChange={(e) => handleInputChange('budget_min', e.target.value)}
                        className="w-full"
                    />

                    <Input
                        type="number"
                        placeholder="Max Budget"
                        value={localFilters.budget_max || ''}
                        onChange={(e) => handleInputChange('budget_max', e.target.value)}
                        className="w-full"
                    />

                    <Button onClick={handleSearch} className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>

                    <Button onClick={handleReset} variant="outline" className="w-full">
                        <X className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
