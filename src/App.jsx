import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Dummy Data
const dummyPrices = [
  { date: "Mon", price: 42000, ma7: 41500 },
  { date: "Tue", price: 43000, ma7: 41800 },
  { date: "Wed", price: 44000, ma7: 42200 },
  { date: "Thu", price: 43500, ma7: 42500 },
  { date: "Fri", price: 45000, ma7: 43000 },
  { date: "Sat", price: 46000, ma7: 43500 },
  { date: "Sun", price: 47000, ma7: 44000 },
];

const weights = [0.3, 0.5, -0.2];
const bias = 0.1;

function predict(features) {
  let z = bias;
  for (let i = 0; i < features.length; i++) {
    z += features[i] * weights[i];
  }
  const prob = 1 / (1 + Math.exp(-z));
  return {
    label: prob > 0.5 ? "UP" : "DOWN",
    confidence: (prob * 100).toFixed(2),
  };
}

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 shadow">
      <h1 className="text-xl font-bold">TokenTrend</h1>
      <input
        className="bg-gray-800 px-3 py-1 rounded"
        placeholder="Search token..."
      />
    </div>
  );
}

function TokenCard() {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg">BTC</h2>
      <p className="text-2xl font-bold">$47,000</p>
      <p className="text-green-400">+3.2%</p>
    </div>
  );
}

function PriceChart() {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="mb-2">Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyPrices}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#4ade80" />
          <Line type="monotone" dataKey="ma7" stroke="#60a5fa" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function PredictionPanel({ result }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="text-lg font-bold">AI Prediction</h2>
      <div className="text-3xl mt-2">
        {result.label === "UP" ? "📈 UP" : "📉 DOWN"}
      </div>
      <p className="mt-2">{result.confidence}% confidence</p>
      <div className="mt-2 bg-gray-700 h-2 rounded">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${result.confidence}%` }}
        ></div>
      </div>
    </div>
  );
}

function Indicators() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-900 p-4 rounded-xl">RSI: 62</div>
      <div className="bg-gray-900 p-4 rounded-xl">Volatility: Low</div>
      <div className="bg-gray-900 p-4 rounded-xl">MA(7): 44k</div>
      <div className="bg-gray-900 p-4 rounded-xl">MA(14): 42k</div>
    </div>
  );
}

function Explanation({ result }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="font-bold mb-2">Why this prediction?</h2>
      {result.label === "UP" ? (
        <ul className="list-disc ml-4">
          <li>Price above moving average</li>
          <li>Positive momentum</li>
          <li>Stable volatility</li>
        </ul>
      ) : (
        <ul className="list-disc ml-4">
          <li>Price below moving average</li>
          <li>Negative momentum</li>
          <li>High volatility</li>
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [result, setResult] = useState({ label: "UP", confidence: "0" });

  useEffect(() => {
    const features = [1.2, 0.8, -0.5];
    const res = predict(features);
    setResult(res);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="p-4 grid gap-4">
        <div className="grid grid-cols-4 gap-4">
          <TokenCard />
          <TokenCard />
          <TokenCard />
          <TokenCard />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <PriceChart />
          </div>
          <PredictionPanel result={result} />
        </div>

        <Indicators />
        {/* <Explanation result={result} /> */}
      </div>
    </div>
  );
}
