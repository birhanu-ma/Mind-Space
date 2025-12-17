import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Image from "../../assets/image/luiz-rogerio-nunes-gkJYH0FLtt0-unsplash.jpg";
import {articleAPI} from "../../service/client"


function LearnSection() {
  const { id } = useParams();

  // React Query hook
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => articleAPI.getArticle(id),
    enabled: !!id, // only fetch if id exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
  const article = data?.data?.data||[]

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={Image}
        alt="Article cover"
        className="w-full max-h-[400px] object-cover mt-10"
      />

      <div className="max-w-3xl text-center">
        <h1 className="font-poppins text-xl font-semibold my-6">{article?.header}</h1>
        <p className="font-inter text-base font-light leading-relaxed mb-8">
          {article?.list}
        </p>
      </div>
    </div>
  );
}

export default LearnSection;
