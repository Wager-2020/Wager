import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3d5a80", "#98c1d9", "#ee6c4d"];

const RADIAN = Math.PI / 180;

export default class WinLossPieChart extends PureComponent {
  
  render() {

    const { data } = this.props
    return (
      <PieChart width={310} height={260}>
        <Pie
          data={data}
          cx={80}
          cy={130}
          labelLine={false}
          outerRadius={80}
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