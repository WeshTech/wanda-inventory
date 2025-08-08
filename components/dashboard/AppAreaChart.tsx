"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppLineChart = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Total visitors</h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            height={30}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={8} axisLine={false} width={30} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend
            content={<ChartLegendContent />}
            wrapperStyle={{
              paddingTop: "10px",
              paddingBottom: "0",
            }}
          />
          <Line
            dataKey="mobile"
            type="natural"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default AppLineChart;

// "use client";

// import {
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig;

// const AppAreaChart = () => {
//   const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
//   ];
//   return (
//     <div>
//       <h1 className="text-lg font-medium mb-6 ">Total visitors</h1>
//       <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//         <AreaChart
//           accessibilityLayer
//           data={chartData}
//           margin={{
//             top: 10,
//             right: 10,
//             left: 10,
//             bottom: 5, // Reduced bottom margin
//           }}
//         >
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             tickMargin={8} // Reduced from 10
//             axisLine={false}
//             height={30} // Explicit height to reduce space
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <YAxis
//             tickLine={false}
//             tickMargin={8} // Reduced from 10
//             axisLine={false}
//             width={30} // Explicit width
//           />
//           <ChartTooltip content={<ChartTooltipContent />} />
//           <ChartLegend
//             content={<ChartLegendContent />}
//             wrapperStyle={{
//               paddingTop: "10px", // Reduced from default
//               paddingBottom: "0", // Removed bottom padding
//             }}
//           />
//           <Area
//             dataKey="mobile"
//             type="natural"
//             fill="var(--color-mobile)"
//             fillOpacity={0.4}
//             stroke="var(--color-mobile)"
//             stackId="a"
//           />
//           <Area
//             dataKey="desktop"
//             type="natural"
//             fill="var(--color-desktop)"
//             fillOpacity={0.4}
//             stroke="var(--color-desktop)"
//             stackId="a"
//           />
//         </AreaChart>
//       </ChartContainer>
//     </div>
//   );
// };

// export default AppAreaChart;
