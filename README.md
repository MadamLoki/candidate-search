# GitHub Talent Scout

A React application that helps recruiters find and manage potential candidates from GitHub. The application allows users to browse GitHub profiles, save interesting candidates, and manage their list of potential recruits.

## Table of Contents

- [GitHub Talent Scout](#github-talent-scout)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Home Page (Candidate Search)](#home-page-candidate-search)
    - [Saved Candidates Page](#saved-candidates-page)
  - [Building for Production](#building-for-production)
  - [Environment Variables](#environment-variables)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Contact](#contact)

## Features

- Browse random GitHub profiles with detailed user information
- Search for specific GitHub users
- Save potential candidates to a local list
- View and manage saved candidates
- Responsive design with dark theme
- Real-time profile filtering and sorting

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- GitHub REST API

## Prerequisites

Before running this project, you need:

1. Node.js (version 18 or higher)
2. A GitHub Personal Access Token with `user` scope permissions

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd github-talent-scout
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
VITE_GITHUB_TOKEN=your_github_token_here
```

4. Start the development server:

```bash
npm run dev
```

## Usage

### Home Page (Candidate Search)

- View one GitHub profile at a time
- Click "+" to save a candidate to your list
- Click "-" to skip to the next candidate
- Search for specific GitHub users using the search bar

### Saved Candidates Page

- View all saved candidates in a table format
- Filter candidates by various criteria
- Sort candidates by different fields
- Remove candidates from your saved list

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Required environment variables:

- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- GitHub API for providing the data
- React and Vite communities for excellent documentation
- TailwindCSS for the styling utilities

## Contact

For any questions, please contact me at [sara.j.ryan.90@gmail.com](mailto:sara.j.ryan.90@gmail.com)

GitHub: [Madam_Loki](http://github.com/Madam_Loki)