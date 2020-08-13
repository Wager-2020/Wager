import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3d5a80", "#98c1d9", "#ee6c4d"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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

    const { data } = this.props
    return (
      <PieChart width={285} height={300}>
        <Pie
          data={data}
          cx={70}
          cy={145}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend 
          layout="vetical" 
          verticalAlign="middle" 
          align="right" 
          height={54} />
      </PieChart>
    );
  }
}

/*
.win-loss-chart 

*/