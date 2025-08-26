// ========================================================================
// FILE: src/pages/ReviewsPage.jsx
// ========================================================================
import React from 'react';
import Header from '../components/Header';
import useReviewsData from '../hooks/useReviewsData';

const StarRating = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.363 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.362-2.44a1 1 0 00-1.176 0l-3.362 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
        ))}
    </div>
);


const ReviewsPage = () => {
        const { data, loading, error } = useReviewsData('');
        const reviews = data && Array.isArray(data) ? data : [];

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header title="Customer Reviews" subtitle="See what our valued customers have to say about us." />
            <main className="container mx-auto py-12 px-4">
                        <div className="space-y-8 max-w-3xl mx-auto">
                            {loading && <p className="text-center">Loading reviews...</p>}
                            {error && <p className="text-center text-red-500">Failed to load reviews.</p>}
                            {!loading && !error && reviews.length === 0 && (
                                <p className="text-center text-gray-600">No reviews yet.</p>
                            )}
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-xl font-bold mr-4">{review.name}</h3>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-600 italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
            </main>
        </div>
    );
};

export default ReviewsPage;