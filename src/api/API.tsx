const searchGithub = async () => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (!token) {
      throw new Error('GitHub token is not configured');
    }

    const response = await fetch(
      `https://api.github.com/users?per_page=100`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const users = await response.json();
    const randomIndex = Math.floor(Math.random() * users.length);
    return [users[randomIndex]];
  } catch (err) {
    console.error('Error in searchGithub:', err);
    throw err;
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    if (!token) {
      throw new Error('GitHub token is not configured');
    }

    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
      }
    );

    if (response.status === 404) {
      const users = await searchGithub();
      if (users?.[0]) {
        return searchGithubUser(users[0].login);
      }
      throw new Error('No users available');
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in searchGithubUser:', err);
    throw err;
  }
};

export { searchGithub, searchGithubUser };