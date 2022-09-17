import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Rewarder } from '../../constants';

function VolumeChart({ rewarder }: { rewarder: Rewarder }): JSX.Element {
  const reverseVolume = rewarder.pair.volumeUSD.slice().reverse();
  return (
    <ResponsiveContainer height={500}>
      <LineChart
        data={reverseVolume.map((volume, index) => {
          const date = new Date(Date.now() - (29 - index) * 3600 * 24 * 1000);
          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
          return { volume: volume, date: `${day}/${month}` };
        })}
      >
        <Line type="monotone" dataKey="volume" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
        <XAxis tick={{ fill: 'white' }} dataKey="date" />
        <YAxis tick={{ fill: 'white' }} />
        <Tooltip
          formatter={(value: number, name: any, props: any) => {
            return [value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '$', 'Volume'];
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default VolumeChart;
