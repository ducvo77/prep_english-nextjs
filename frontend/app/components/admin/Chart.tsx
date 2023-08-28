"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export default function Chart() {
  return (
    // <LineChart width={500} height={300} data={data}>
    //   <XAxis dataKey="name" />
    //   <YAxis />
    //   <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    //   <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    //   <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    // </LineChart>
    <div></div>
  );
}
