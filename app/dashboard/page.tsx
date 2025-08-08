import AppAreaChart from "@/components/dashboard/AppAreaChart";
import AppBarChart from "@/components/dashboard/AppBarChart";
import Cards from "@/components/dashboard/Cards";
import RecentSalesTable from "@/components/dashboard/RecentSalesTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, RefreshCw, Download, Calendar, Store } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header Section - Sticky with backdrop blur */}
      {/* Responsive version that switches at lg breakpoint */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-6">
            {/* Title Section */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Icon container with responsive sizing */}
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  Monitor your inventory system performance
                </p>
              </div>
            </div>

            {/* Controls Section - switches to row layout on desktop */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row xs:flex-row gap-2 lg:gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full xs:w-[150px] lg:w-[180px] bg-background/50 border-border/50">
                    <Store className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stores</SelectItem>
                    <SelectItem value="store1">Main Store</SelectItem>
                    <SelectItem value="store2">Warehouse A</SelectItem>
                    <SelectItem value="store3">Warehouse B</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="monthly">
                  <SelectTrigger className="w-full xs:w-[150px] lg:w-[180px] bg-background/50 border-border/50">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Last 7 Days</SelectItem>
                    <SelectItem value="weekly">Last 4 Weeks</SelectItem>
                    <SelectItem value="monthly">Last 6 Months</SelectItem>
                    <SelectItem value="yearly">Last 2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 lg:pl-3 lg:border-l lg:border-border/40">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 lg:flex-none bg-background/50 hover:bg-background/70"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline lg:flex">Refresh</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 lg:flex-none bg-background/50 hover:bg-background/70"
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline lg:flex">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Metrics Cards Section */}
        <section>
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Key Metrics
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Overview of your business performance
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Cards />
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Analytics
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Detailed insights and trends
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border-0 shadow-sm sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-4 sm:p-6">
                <AppBarChart />
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border-0 shadow-sm sm:shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-4 sm:p-6">
                <AppAreaChart />
              </div>
            </Card>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section>
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              Recent Activity
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Latest transactions and sales data
            </p>
          </div>
          <div className="w-[90vw] md:w-auto mx-auto overflow-x-auto shadow-sm rounded-lg border">
            <RecentSalesTable />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

// import AppAreaChart from "@/components/dashboard/AppAreaChart";
// import AppBarChart from "@/components/dashboard/AppBarChart";
// import Cards from "@/components/dashboard/Cards";
// import RecentSalesTable from "@/components/dashboard/RecentSalesTable";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { BarChart3, RefreshCw, Download, Calendar, Store } from "lucide-react";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
//       {/* Header Section */}
//       <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             {/* Title Section */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
//                 <BarChart3 className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
//                   Dashboard Overview
//                 </h1>
//                 <p className="text-sm text-muted-foreground">
//                   Monitor your inventory system performance in real-time
//                 </p>
//               </div>
//             </div>

//             {/* Controls Section */}
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//               {/* Filter Controls */}
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <Select defaultValue="all">
//                   <SelectTrigger className="w-[160px] bg-background/50 border-border/50">
//                     <Store className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <SelectValue placeholder="Select store" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Stores</SelectItem>
//                     <SelectItem value="store1">Main Store</SelectItem>
//                     <SelectItem value="store2">Warehouse A</SelectItem>
//                     <SelectItem value="store3">Warehouse B</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Select defaultValue="monthly">
//                   <SelectTrigger className="w-[160px] bg-background/50 border-border/50">
//                     <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <SelectValue placeholder="Time period" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="daily">Last 7 Days</SelectItem>
//                     <SelectItem value="weekly">Last 4 Weeks</SelectItem>
//                     <SelectItem value="monthly">Last 6 Months</SelectItem>
//                     <SelectItem value="yearly">Last 2 Years</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="bg-background/50"
//                 >
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Refresh
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="bg-background/50"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Export
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-6 space-y-8">
//         {/* Metrics Cards Section */}
//         <section>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-foreground">
//               Key Metrics
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Overview of your business performance
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Cards />
//           </div>
//         </section>

//         {/* Analytics Section */}
//         <section>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
//             <p className="text-sm text-muted-foreground">
//               Detailed insights and trends
//             </p>
//           </div>
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//             <Card className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
//               <div className="p-6">
//                 <AppBarChart />
//               </div>
//             </Card>

//             <Card className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
//               <div className="p-6">
//                 <AppAreaChart />
//               </div>
//             </Card>
//           </div>
//         </section>

//         {/* Recent Activity Section */}
//         <section>
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-foreground">
//               Recent Activity
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Latest transactions and sales data
//             </p>
//           </div>
//           <RecentSalesTable />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
