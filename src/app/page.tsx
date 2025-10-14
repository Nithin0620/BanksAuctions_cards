import SearchForm from '@/components/SearchForm';
import PropertyListingPage from '@/components/PropertyListingPage';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Bank Property Auctions</h1>
                    <p className="text-sm text-gray-600 mt-1">Find your next property opportunity</p>
                </div>
            </header>
            <SearchForm />
            <PropertyListingPage />
        </main>
    );
} 