// "use client";

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { mentorAPI } from "../../service/client.jsx";

// import DepartmentChart from "../../components/chart/Department-chart.jsx";
// import PieChartComponent from "../../components/chart/PieChartComponent.jsx";
// import StudentsTable from "../../features/Counselor/myMenteeTable.jsx";
// import Spinner from "../../components/ui/Spinner.jsx";

// export default function MyMentee() {
//   const mentorId = localStorage.getItem("id");

//   // Fetch stats for the mentor
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["mentorStats", mentorId],
//     queryFn: () => mentorAPI.getMenteeStats(mentorId),
//     enabled: !!mentorId,
//     retry: false,
//   });

//   if (isLoading) return <Spinner />;
//   if (isError)
//     return (
//       <p className="text-center text-red-500">Failed to load mentor stats</p>
//     );

//   const { stats } = data || {};
//   if (!stats)
//     return <p className="text-center text-gray-500">No stats available</p>;

//   const {
//     menteeCount = [],
//     menteeDepartmentCounts = [],
//     menteeYearCounts = [],
//     activeInactiveCounts = [],
//   } = stats;

//   // Total number of mentees
//   // const numMentee = menteeCount[0]?.count || 0;

//   // Active/inactive counts
//   // let activeCount = 0;
//   // let inactiveCount = 0;
//   activeInactiveCounts.forEach((item) => {
//     if (item._id === true) activeCount = item.count;
//     else if (item._id === false) inactiveCount = item.count;
//   });

//   return (
//     <div className="flex flex-col sm:flex-row overflow-y-scroll h-screen w-full bg-background text-foreground border border-border rounded-lg">
//       <div className="rounded-lg px-5 w-full min-h-screen">
//         {/* Stats Cards */}

//         {/* Charts */}
//         {/* <div className="flex flex-col gap-4 mb-5 sm:flex-row justify-center items-center">
//           <DepartmentChart
//             data={menteeDepartmentCounts}
//             title="AASTU Mentees by Department"
//             totalValue={numMentee}
//             maxValue={10}
//           />
//           <PieChartComponent data={menteeYearCounts} />
//         </div> */}

//         {/* Students Table */}
//         <StudentsTable mentorId={mentorId} />
//       </div>
//     </div>
//   );
// }
