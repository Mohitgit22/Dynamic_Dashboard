import Table from "../components/Table/page";

const DashboardPage = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-gray-600">This is your main dashboard page.</p>
        <Table />
      </div>
    );
  };
  
  export default DashboardPage;
  