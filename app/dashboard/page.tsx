import AppAreaChart from "@/components/dashboard/AppAreaChart";
import AppBarChart from "@/components/dashboard/AppBarChart";
import Cards from "@/components/dashboard/Cards";
import RecentSalesTable from "@/components/dashboard/RecentSalesTable";

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Cards />
      </div>

      {/* Second Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <AppBarChart />
        </div>

        <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <AppAreaChart />
        </div>

        {/* Pie Chart */}
        {/* <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300 lg:col-span-2 xl:col-span-1">
          <AppPieChart />
        </div> */}
      </div>

      {/* Third Row - Recent Sales Table */}
      <div className="w-full">
        <RecentSalesTable />
      </div>
    </div>
  );
};

export default HomePage;
