import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchNextCandidate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const users = await searchGithub();
      if (!users?.[0]) {
        throw new Error('No users available');
      }

      const detailedUser = await searchGithubUser(users[0].login);
      setCurrentCandidate(detailedUser);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching candidate:', err);
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        await fetchNextCandidate();
      } else {
        setError('Unable to load candidate. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleAccept = async () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const candidateToSave = {
        id: currentCandidate.id,
        login: currentCandidate.login,
        name: currentCandidate.name || null,
        avatar_url: currentCandidate.avatar_url,
        location: currentCandidate.location || null,
        email: currentCandidate.email || null,
        company: currentCandidate.company || null,
        bio: currentCandidate.bio || null,
        html_url: currentCandidate.html_url
      };
      
      localStorage.setItem(
        'savedCandidates', 
        JSON.stringify([...savedCandidates, candidateToSave])
      );
    }
    await fetchNextCandidate();
  };

  const handleReject = () => {
    fetchNextCandidate();
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchNextCandidate();
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-12">Candidate Search</h1>
        <div className="bg-red-500/10 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button 
          onClick={handleRetry}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-8">
      <h1 className="text-4xl font-bold mb-12 text-white">Candidate Search</h1>
      
      {currentCandidate && !isLoading && (
        <div className="w-[400px] flex flex-col bg-white rounded-lg overflow-hidden">
          {/* Image Container */}
          <div className="w-full bg-white p-4">
            <img 
              src={currentCandidate.avatar_url} 
              alt={currentCandidate.login}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>
          
          {/* Info Container */}
          <div className="w-full bg-black p-4 space-y-2">
            <h2 className="text-xl font-semibold text-white">
              {currentCandidate.login}
              <span className="text-gray-400 ml-1">({currentCandidate.login})</span>
            </h2>
            
            <div className="space-y-1">
              {currentCandidate.location && (
                <p className="text-white">
                  Location: <span className="text-gray-300">{currentCandidate.location}</span>
                </p>
              )}
              {currentCandidate.email && (
                <p className="text-white">
                  Email: <a href={`mailto:${currentCandidate.email}`} className="text-blue-400 hover:underline">
                    {currentCandidate.email}
                  </a>
                </p>
              )}
              {currentCandidate.company && (
                <p className="text-white">
                  Company: <span className="text-gray-300">{currentCandidate.company}</span>
                </p>
              )}
              {currentCandidate.bio && (
                <p className="text-white">
                  Bio: <span className="text-gray-300">{currentCandidate.bio}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {currentCandidate && !isLoading && (
        <div className="flex justify-center space-x-16 mt-8">
          <button 
            onClick={handleReject}
            className="w-16 h-16 rounded-full bg-red-600 text-white text-3xl flex items-center justify-center hover:bg-red-700 transition-colors"
            disabled={isLoading}
          >
            −
          </button>
          <button 
            onClick={handleAccept}
            className="w-16 h-16 rounded-full bg-green-600 text-white text-3xl flex items-center justify-center hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            +
          </button>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center py-8 text-white">Loading...</div>
      )}
    </div>
  );
};

export default CandidateSearch;