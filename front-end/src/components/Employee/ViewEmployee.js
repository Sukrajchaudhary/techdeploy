import { Eye, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  selectAllEmployee,
  selectEmployeeError,
  selectEmployeeIsLoading,
  getAllEmployeeAsync,
  resetMessages,
} from "../../features/Employee/employeeSlice";
import Loadding from "../../Common/Loadding";
import toast from "react-hot-toast";
const ViewEmployee = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const fetchEmployeeError = useSelector(selectEmployeeError);
  const isLoadding = useSelector(selectEmployeeIsLoading);
  const allEmployee = useSelector(selectAllEmployee);
  useEffect(() => {
    dispatch(getAllEmployeeAsync());
  }, []);

  useEffect(() => {
    if (fetchEmployeeError?.error) {
      toast.error(fetchEmployeeError?.error);
      dispatch(resetMessages());
    }
    return () => {
      dispatch(resetMessages());
    };
  }, [fetchEmployeeError]);
  return (
    <>
      {isLoadding && <Loadding />}
      <section>
        <h6 className="font-bold sm:text-2xl text-xl">{location.pathname}</h6>

        <ul className="mt-6 flex overflow-y-scroll md:overflow-y-auto w-full border-gray-200 text-gray-400">
          <li className="border-brand-red text-brand-red flex cursor-pointer items-center justify-between gap-2 font-medium border-b px-3 py-2.5 first:pl-0 ">
            All
            <span className="bg-red-500 text-white py-1 px-2 font-bold rounded-md flex justify-center items-center text-xs">
              {allEmployee?.employee.length}
            </span>
          </li>
        </ul>
        <div>
          <div className="rounded-md border bg-white">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      <button className="inline-flex items-center justify-center text-is-default rounded-lg text-sm ring-offset-background duration-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-5 py-5 font-medium">
                        Name
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth={0}
                          viewBox="0 0 15 15"
                          className="ml-2 h-4 w-4"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      email
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      <div className="text-center">Role</div>
                    </th>

                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                      <div className="text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployee?.employee.map((employee, index) => (
                    <>
                      {" "}
                      <tr
                        key={employee._id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 text-left align-middle">
                          <div>{employee.username}</div>
                        </td>
                        <td className="p-4 text-left align-middle">
                          <div>{employee.email}</div>
                        </td>
                        <td className="p-4 text-left align-middle">
                          <div className="text-center text-red-700  rounded-lg text-sm font-semibold">
                            {employee.role}
                          </div>
                        </td>

                        <td className="p-4 text-left align-middle">
                          <div className="text-center">
                            <Link to={`/ViewIntrenShipDetailsPage/${index}`}>
                              {" "}
                              <button className=" p-1 px-2  text-black rounded-md">
                                <Eye />
                              </button>
                            </Link>{" "}
                            <button className="p-1 px-2  text-white rounded-md">
                              <Trash2 color="#f10e0e" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewEmployee;
