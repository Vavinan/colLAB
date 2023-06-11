import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Chat from '../components/Chat';
import Posts from './Posts';
import CreatePost from './PostPages/CreatePost';

export const Home = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [isPostsPage, setIsPostsPage] = useState(false);
  //const [isCreate, setIsCreate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
    setIsPostsPage(!isPostsPage);
   // setIsCreate(false);
    setShowCreate(false);
  };

  const handleCreatePost = () => {
    //setIsCreate(!isCreate);
    setShowCreate(!showCreate);

  };
  const handlePostSuccess = () => {
    setShowPosts(true);
    setIsPostsPage(true);
    setShowCreate(false);
  };

  return (
    <div className="home">
      <div className="container">
        {!showPosts && <Sidebar />}
        {!showPosts && <Chat />}
        {showPosts ? (
          showCreate ? (
            <CreatePost onPostSuccess={handlePostSuccess} />
          ) : (
            <Posts isAuth={true} />
          )
        ) : null}
         <div className="buttons-container">
         <button className= "buttonStyles show-chats-button" onClick={handleShowPosts}>
          {isPostsPage ? 'Show Chats' : 'Show Posts'}
        </button>
  
        {isPostsPage && (
          <button className= "buttonStyles" onClick={handleCreatePost}>
            {showCreate ? 'Show Posts' : 'Create Post'}
          </button>
        )}
         </div>
      </div>
    </div>
  );
  
};
