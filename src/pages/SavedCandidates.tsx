import { useState, useEffect } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleReject = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Potential Candidates</h1>
      
      <div className="overflow-x-auto">
        <table className="candidates-table">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Bio</th>
              <th className="px-4 py-2">Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id} className="bg-opacity-50">
                <td className="px-4 py-2">
                  <img 
                    src={candidate.avatar_url} 
                    alt={candidate.login}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  {candidate.name || candidate.login}
                  <br />
                  <span className="text-gray-400">({candidate.login})</span>
                </td>
                <td className="px-4 py-2">
                  {candidate.location || '—'}
                </td>
                <td className="px-4 py-2">
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`} className="text-blue-400 hover:underline">
                      {candidate.email}
                    </a>
                  ) : '—'}
                </td>
                <td className="px-4 py-2">
                  {candidate.company || '—'}
                </td>
                <td className="px-4 py-2">
                  {candidate.bio || '—'}
                </td>
                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleReject(candidate.id)}
                    className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center"
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedCandidates.length === 0 && (
        <p className="text-center mt-8">No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;