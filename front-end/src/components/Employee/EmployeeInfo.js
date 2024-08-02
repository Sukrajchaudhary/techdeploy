import React from "react";
import { Sigma, X } from "lucide-react";
import { useSelector } from "react-redux";
import {selectEmployees} from "../../features/Employee/employeeSlice"
const EmployeeInfo = () => {
  const employeeName=useSelector(selectEmployees)
  return (
    <section className="p-4">
      <div className="flex flex-col">
        <h1 className="font-bold mr-auto text-lg p-3">
          Hey there,{employeeName?.username} !
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-4">
          <div className="w-full bg-gray-200 h-32 rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full px-8">
              <div>
                <h1 className="font-bold text-lg">Total Employee</h1>
                <h1 className="font-bold text-lg">3</h1>
              </div>
              <Sigma size={38} color="#18af36" strokeWidth={3} />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-32 rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full px-8">
              <div>
                <h1 className="font-bold text-lg">Rejected</h1>
                <h1 className="font-bold text-lg">3</h1>
              </div>
              <X size={38} color="#af1818" strokeWidth={3} />
            </div>
          </div>
          <div className="w-full bg-gray-200 h-32 rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full px-8">
              <div>
                <h1 className="font-bold text-lg">Total Employee</h1>
                <h1 className="font-bold text-lg">3</h1>
              </div>
              <Sigma size={38} color="#18af36" strokeWidth={3} />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-32 rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full px-8">
              <div>
                <h1 className="font-bold text-lg">Rejected</h1>
                <h1 className="font-bold text-lg">3</h1>
              </div>
              <X size={38} color="#af1818" strokeWidth={3} />
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default EmployeeInfo;
