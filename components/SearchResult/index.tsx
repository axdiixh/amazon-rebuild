import React from 'react';
import ProductCard from '../ProductCard';

const SearchResult = ({ filterData, loading }: { filterData: any, loading: boolean }) => {
  if (loading) {
    return (
      <div className='md:w-[80%] mx-5 md:mx-auto'>
        <div className='mt-10'>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (!filterData || filterData.length === 0) {
    return (
      <div className='md:w-[80%] mx-5 md:mx-auto'>
        <div className='mt-10'>
          <h1 className='font-bold text-2xl'>No Products Found</h1>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-5 md:w-[80%] md:mx-auto'>
      <div className='mt-10'>
        <div>
          <h1 className='font-bold text-2xl'>{filterData?.length} Products</h1>
          <p>Price and other details may vary based on product size and colour.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {filterData?.map((product: any) => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
