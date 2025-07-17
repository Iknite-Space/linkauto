import DataTable from "react-data-table-component";
import { id } from "zod/v4/locales";

const UserVerification = () => {
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "rgb(1 40 91 / var(--tw-bg-opacity, 1));",
        color: "white",
      },
    },
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "tony@gmail.com",
      role: "car owner ",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Verify
        </button>
      ),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "smith@gamil.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 5,
      name: "Charlie White",
      email: "charlie@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 6,
      name: "David Green",
      email: "david@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 7,
      name: "Eva Black",
      email: "eva@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 8,
      name: "Frank Blue",
      email: "frank@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 9,
      name: "Grace Yellow",
      email: "grace@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 10,
      name: "Hank Purple",
      email: "hank@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 11,
      name: "Ivy Orange",
      email: "ivy@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 12,
      name: "Jack Pink",
      email: "jack@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 13,
      name: "Lily Gray",
      email: "lily@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 14,
      name: "Mike Cyan",
      email: "mike@gmail.com",
      role: "car owner",
      status: "verified",
      action: (
        <button
          title="click here to verify"
          className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          verify
        </button>
      ),
    },
    {
      id: 15,
      name: "Nina Magenta",
      email: "nina@gmail.com",
      role: "car owner",
      status: "pending",
      action: (
        <div>
          <button
            title="Click here to verify"
            className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            verify
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      title="User Verification"
      pagination
      fixedHeader
    />
  );
};

export default UserVerification;
