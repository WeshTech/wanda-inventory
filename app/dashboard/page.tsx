import AppAreaChart from "@/components/dashboard/AppAreaChart";
import AppBarChart from "@/components/dashboard/AppBarChart";
import AppPieChart from "@/components/dashboard/AppPieChart";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import CardList from "@/components/dashboard/CardList";
import Navbar from "@/components/dashboard/Navbar";
import TodoList from "@/components/dashboard/TodoList";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <AppSidebar />
      <Navbar />

      <div className="bg-gray-100 p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <CardList title="Popular Content" />
      </div>
    </div>
  );
};

export default HomePage;
