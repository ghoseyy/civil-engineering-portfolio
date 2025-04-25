'use client';

import { useRefresh } from '../context/RefreshContext';

export default function RefreshButton() {
  const { triggerRefresh } = useRefresh();
  return (
    <button
      onClick={triggerRefresh}
      className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      title="Refresh Content"
    >
      <i className="fas fa-sync-alt"></i>
    </button>
  );
} 