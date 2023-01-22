import React from 'react';
import './App.css';
import { HNStoriesDisplay } from './components/HNStoriesDisplay';
import { StoriesFeed } from './api/HNStory';

function App() {
  const stories = StoriesFeed();
  return (
    <div className="App">
      <h1>HackerNews Top 100 Posts</h1>
      <HNStoriesDisplay stories={stories} />
    </div>
  );
}

export default App;
