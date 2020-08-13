import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

const COLORS = ["#3d5a80", "#98c1d9", "#ee6c4d"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class WinLossPieChart extends PureComponent {
  
  render() {
    // const data = [
    //   { name: "Wins", value: 1 },
    //   { name: "Pending Bets", value: 5 },
    //   { name: "Losses", value: 0 },
    // ];

    const { data } = this.props
    debugger;
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}

// import React, { PureComponent } from "react";
// import { PieChart, Pie, Legend, Tooltip } from "recharts";

// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 278 },
//   { name: "Group F", value: 189 },
// ];

// const data02 = [
//   { name: "Group A", value: 2400 },
//   { name: "Group B", value: 4567 },
//   { name: "Group C", value: 1398 },
//   { name: "Group D", value: 9800 },
//   { name: "Group E", value: 3908 },
//   { name: "Group F", value: 4800 },
// ];

// export default class Example extends PureComponent {
//   static jsfiddleUrl = "https://jsfiddle.net/alidingling/k9jkog04/";

//   render() {
//     return (
//       <PieChart width={400} height={400}>
//         <Pie
//           dataKey="value"
//           isAnimationActive={false}
//           data={data01}
//           cx={200}
//           cy={200}
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         />
//         <Pie
//           dataKey="value"
//           data={data02}
//           cx={500}
//           cy={200}
//           innerRadius={40}
//           outerRadius={80}
//           fill="#82ca9d"
//         />
//         <Tooltip />
//       </PieChart>
//     );
//   }
// }
