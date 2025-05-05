import React from 'react'
import { 
    AreaChart,
    Area,
    BarChart,
    PieChart,
    Pie,
    Cell,
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid, 
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

//data must be array of objects

export const BarChartGraph = ({data, dataKey, xAxisName, color='#8884d8'}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisName} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export const LineChartGraph  = ({data, dataKey, xAxisName, type='monotone'}) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisName} />
            <YAxis />
            <Tooltip />
            <Line type={type} dataKey={dataKey} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
}

export const AreaChartGraph  = ({data, type='monotone', dataKey, xAxisName, color='#8884d8'}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisName} />
          <YAxis />
          <Tooltip />
          <Area type={type} dataKey={dataKey} stroke="#8884d8" fill={color} />
        </AreaChart>
      </ResponsiveContainer>
    )
}

export const PieChartGraph  = ({data, dataKey, name, color='#8884d8'}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie 
                data={data}
                dataKey={dataKey}
                nameKey={name}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill={color}
                label
                > 
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

