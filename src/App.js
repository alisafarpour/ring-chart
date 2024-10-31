import logo from './logo.svg';
import './App.css';
import CircularRings from './components/CircularRings';
import Trading from './components/Trading';

function App() {

  const data12 = [
    {
      value: 75,
      color: '#22c55e',
      startColor: '#22c55e',
      endColor: '#16a34a',
      label: 'Ring 1'
    },
    {
      value: 85,
      color: '#3b82f6',
      startColor: '#3b82f6',
      endColor: '#2563eb',
      label: 'Ring 2'
    },
    {
      value: 45,
      color: '#a855f7',
      startColor: '#a855f7',
      endColor: '#9333ea',
      label: 'Ring 3'
    },
    {
      value: 65,
      color: '#f97316',
      startColor: '#f97316',
      endColor: '#ea580c',
      label: 'Ring 4'
    },
    {
      value: 90,
      color: '#ef4444',
      startColor: '#ef4444',
      endColor: '#dc2626',
      label: 'Ring 5'
    },
    {
      value: 55,
      color: '#06b6d4',
      startColor: '#06b6d4',
      endColor: '#0891b2',
      label: 'Ring 6'
    },
    {
      value: 70,
      color: '#ec4899',
      startColor: '#ec4899',
      endColor: '#db2777',
      label: 'Ring 7'
    },
    {
      value: 18,
      color: '#84cc16',
      startColor: '#84cc16',
      endColor: '#65a30d',
      label: 'Ring 8'
    },
    {
      value: 80,
      color: '#f59e0b',
      startColor: '#f59e0b',
      endColor: '#d97706',
      label: 'Ring 9'
    },
    {
      value: 95,
      color: '#6366f1',
      startColor: '#6366f1',
      endColor: '#4f46e5',
      label: 'Ring 10'
    },
    {
      value: 60,
      color: '#14b8a6',
      startColor: '#14b8a6',
      endColor: '#0d9488',
      label: 'Ring 11'
    },
    {
      value: 50,
      color: '#8b5cf6',
      startColor: '#8b5cf6',
      endColor: '#7c3aed',
      label: 'Ring 12'
    },
  ];



  return (
    <div className="App">
      {/* <CircularRings data={data12} centerText="22K" /> */}
      <Trading/>
    </div>
  );
}

export default App;
