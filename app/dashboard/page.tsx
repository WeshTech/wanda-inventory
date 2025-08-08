import AppBarChart from "@/components/dashboard/AppBarChart";
import AppLineChart from "@/components/dashboard/AppLineChart";
import Cards from "@/components/dashboard/Cards";

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* First Row - Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Cards />
      </div>

      {/* Second Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <AppBarChart />
        </div>

        {/* Area Chart */}
        <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <AppLineChart />
        </div>

        {/* Pie Chart */}
        {/* <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border-0 hover:shadow-xl transition-all duration-300 lg:col-span-2 xl:col-span-1">
          <AppPieChart />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
