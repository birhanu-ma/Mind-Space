import React, { useState } from "react";
import DepartmentChart from "../../components/chart/Department-chart.jsx";

import PieChartComponent from "../../components/chart/PieChartComponent.jsx";
import StudentsTable from "../../features/admin/studentTable.jsx";
import { useQuery } from "@tanstack/react-query";
import { studentUnionAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";


function Student() {
  const [role, setRole] = useState("All");
  const [query, setQuery] = useState({
    q: "",
    sort: "name",
    page: 1,
    limit: 10,
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["student", role, query],
    queryFn: async () => {
      if (role === "All") {
        return await studentUnionAPI.getAllStudents(query);
      } else {
        return await studentUnionAPI.getStudentsByRole({ role, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load student information.
      </p>
    );

  const { data: students, stats, total } = data || {};
  const countByDepartment = stats?.countByDepartment || [];
  const countByYear = stats?.countByYear || [];

 

  if (!students?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-foreground/60">
        <div className="mb-4">
          <label className="mr-2 text-sm font-medium">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2 text-sm"
          >
            <option value="All">All</option>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          
          </select>
        </div>
        No students found for this role.
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row w-full bg-background text-foreground border border-border rounded-lg">
      <div className="rounded-lg px-5 w-full">
        {/* Role Filter */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter by Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
             
            </select>
          </div>
        </div>

        {/* Stats Cards */}
    

        {/* Charts */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-5 bg-muted/10 p-4 rounded-lg">
          <DepartmentChart
            data={countByDepartment}
            title={`Students ${role}s by Department`}
            totalValue={students.length}
            maxValue={10}
          />
          <PieChartComponent data={countByYear} />
        </div>

        {/* Students Table */}
        <StudentsTable
          students={students}
          role={role}
          setRole={setRole}
          title={`Students ${role}s List`}
          subtitle={`Active ${role}s`}
          query={query}
          setQuery={setQuery}
          total={total}
        />
      </div>
    </div>
  );
}

export default Student;
