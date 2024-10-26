"use client";

import { useParams } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/hooks/useSupabase';
import React, { useEffect, useState } from 'react';
import SearchResult from '@/components/SearchResult';

const Page = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      await getFilteredData(query.toString());
      setLoading(false);
    };

    fetchFilteredData();
  }, [query]);

  return (
    <div>
      <SearchResult filterData={filterData} loading={loading} />
    </div>
  );
};

export default Page;
