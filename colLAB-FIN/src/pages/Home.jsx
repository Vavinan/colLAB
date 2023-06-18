import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Chat from '../components/Chat';
import Posts from './Posts';
import CreatePost from './PostPages/CreatePost';
import Bio from './PostPages/Bio';

export const Home = () => {
  const [showPosts, setShowPosts] = useState(true);
  const [isPostsPage, setIsPostsPage] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showBio,setShowBio] = useState(false);

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
    setIsPostsPage(!isPostsPage);
    setShowCreate(false);
    setShowBio(false);
  };

  const handleCreatePost = () => {
    setShowCreate(!showCreate);
    setShowBio(false);
   
  };
  const handleShowBio = () => {
    setShowBio(true);
    setShowCreate(false);
    setShowPosts(false);
    setIsPostsPage(false);
  }
  const handlePostSuccess = () => {
    setShowPosts(true);
    setIsPostsPage(true);
    setShowCreate(false);
    setShowBio(false);
  };

  return (
    <div className="home">
      <div className="container">
        {!showPosts && !showBio && <Sidebar />}
        {!showPosts && !showBio && <Chat />}
        {showPosts ? (
          showCreate ? (
            <CreatePost onPostSuccess={handlePostSuccess} />
          ) : (
            <Posts isAuth={true} handleShowPosts={handleShowPosts}/>
          )
        ) : null }
        {showBio && <Bio />} {/* Display the Bio page when showBio state is true */}

         <div className="buttons-container">
         <button className= "buttonStyles show-chats-button" onClick={handleShowPosts}>
          {isPostsPage ? 'Show Chats' : 'Show Posts'}
        </button>
  
        {isPostsPage && (
          <button className= "buttonStyles" onClick={handleCreatePost}>
            {showCreate ? 'Show Posts' : 'Create Post'}
          </button>
        )}

        {isPostsPage && !showCreate && (
            <button className="buttonStyles" onClick={handleShowBio}>
              Show Bio
            </button>
          )}

         </div>
      </div>
    </div>
  );
  
};
