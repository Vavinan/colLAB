import React from 'react'
import { useEffect,useState } from 'react';
import { getDocs,collection,deleteDoc,doc } from 'firebase/firestore';
 import { auth,db } from '../firebase';
import SearchBar from './PostPages/Searchbar';
import Fuse from 'fuse.js';
import "./PostPages/postcss.css"
const Posts = ({isAuth}) => {
   const [postLists,setPostLists]=useState([]);
   const [loading,setLoading] = useState(false);
   const [expandedPosts, setExpandedPosts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredPosts, setFilteredPosts] = useState([]);
   const [fuse, setFuse] = useState(null);

   const postCollectionRef = collection(db,"posts") 
   
   const getPosts = async () => {
    setLoading(true);
    const data = await getDocs(postCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
    // Initialize the fuse instance
    const fuseInstance = new Fuse(posts, {
      keys: ['title','postContent','skills','contact'],
      includeScore: true,
      threshold: 0.3,
      shouldSort:true,
      findAllMatches: true,
      distance:1000,
    });
  
    setFuse(fuseInstance);
    setPostLists(posts);
    setFilteredPosts(posts);
    setLoading(false);
  };


   useEffect(()=>{
    getPosts();
   },[]);


    const deletePost= async(id) =>{
        const deleteDocRef = doc(db,"posts",id);
        await deleteDoc(deleteDocRef);
        getPosts();
    }

    const toggleExpand = (id) => {
      setExpandedPosts((prevState) => {
        if (prevState.includes(id)) {
          return prevState.filter((postId) => postId !== id);
        } else {
          return [...prevState, id];
        }
      });
    };
  
    const isPostExpanded = (id) => {
      return expandedPosts.includes(id);
    };

const handleSearch = (searchTerm) => {
  setSearchTerm(searchTerm);

  if (!fuse) {
    return;
  }

  if (searchTerm === '') {
    setFilteredPosts(postLists);
  } else {
    const results = fuse.search(searchTerm).map((result) => result.item);
    setFilteredPosts(results);
  }
};

    if(loading){
      return(
        <h3>LOADING...</h3>
      )
    }
    return (
       <>
      <div className="homepage">
        <div className="page-scroll row">
        <div className=" search-bar col-lg-6 offset-lg-3">
            <SearchBar onSearch={handleSearch} />
           </div>
           <div>
            {filteredPosts.length === 0 ? (             
              <h3>No posts</h3>):
            (  filteredPosts.map((post) => {
               const content = isPostExpanded(post.id)
              ? post.postContent
              : post.postContent.slice(0, 300) + '...';
              const shouldShowButton = post.postContent.length > 300;
            
             return (
               <div key={post.id} className="card mb-4 shadow-small">
                <div className="card-body">
                  {isAuth && auth.currentUser && post.author.id === auth.currentUser.uid && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger my-3 mx-3"
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <h5 className="card-title mb-3 fw-bold">{post.title} </h5>
                  <p className="card-text mb-3">
                    {content}
                    {shouldShowButton && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleExpand(post.id)}
                    >
                      {isPostExpanded(post.id) ? 'Read less' : 'Read more'}
                    </button>
                  )}
                  </p>
                  {post.skills &&(
                    <div className="skills-container">
                      <h6>Skills Required:</h6>
                        <p>{post.skills}</p>
                    </div>
                  )}
                    <span className="badge rounded-pill bg-dark">{post.author.name}</span>
                 
                  {post.contact && ( <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">
                    <span className="badge rounded-pill bg-info text-dark">{post.contact}</span>
                  </a>)}


                </div>
              </div>
            );
          })
        )}
      </div>
      </div>
      </div>
      </>
    );
  };
  
  export default Posts;



















/*import React from 'react'
import { useEffect,useState } from 'react';
import { getDocs,collection,deleteDoc,doc } from 'firebase/firestore';
import { auth,db } from '../firebase-config';
import SearchBar from './SearchBar';
import { query } from 'firebase/firestore';
import { where } from 'firebase/firestore';

const Home = ({isAuth}) => {
   const [postLists,setPostLists]=useState([]);
   const [loading,setLoading] = useState(false);
   const [expandedPosts, setExpandedPosts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   const postCollectionRef = collection(db,"posts") 
   
   const getPosts=async()=>{
       setLoading(true);
       const data = await getDocs(postCollectionRef);
       setPostLists(data.docs.map((doc)=>({
        ...doc.data(),id:doc.id
       })));
       setLoading(false);
   }
   useEffect(()=>{
    getPosts();
   },[]);
    const deletePost= async(id) =>{
        const deleteDocRef = doc(db,"posts",id);
        await deleteDoc(deleteDocRef);
        getPosts();
    }

    const toggleExpand = (id) => {
      setExpandedPosts((prevState) => {
        if (prevState.includes(id)) {
          return prevState.filter((postId) => postId !== id);
        } else {
          return [...prevState, id];
        }
      });
    };
  
    const isPostExpanded = (id) => {
      return expandedPosts.includes(id);
    };

    const handleSearch = async (searchTerm) => {
      setLoading(true);
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      if (lowerCaseSearchTerm === '') {
        // Show all posts if the search term is empty
        getPosts();
        setLoading(false);
        return;
      }
      const data = await getDocs(postCollectionRef);
      const filteredPosts = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((post) => post.title.toLowerCase().includes(lowerCaseSearchTerm));
      setPostLists(filteredPosts);
      setLoading(false);
    };

    if(loading){
      return(
        <h3>LOADING...</h3>
      )
    }
    return (
      <div className="homepage">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <SearchBar onSearch={handleSearch} />

            {postLists.length === 0 ? (
             <h3>No posts</h3>):
              (postLists.map((post) => {
               const content = isPostExpanded(post.id)
              ? post.postContent
              : post.postContent.slice(0, 300) + '...';
              const shouldShowButton = post.postContent.length > 300;

             return (
               <div key={post.id} className="card mb-4 shadow-small">
                <div className="card-body">
                  {isAuth && auth.currentUser && post.author.id === auth.currentUser.uid && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger my-3 mx-3"
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <h5 className="card-title mb-3 fw-bold">{post.title} </h5>
                  <p className="card-text mb-3">
                    {content}
                    {shouldShowButton && (
                    <button
                      className="btn btn-link"
                      onClick={() => toggleExpand(post.id)}
                    >
                      {isPostExpanded(post.id) ? 'Read less' : 'Read more'}
                    </button>
                  )}
                  </p>
                  <span className="badge bg-dark">{post.author.name}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      </div>
      </div>
    );
  };
  
  export default Home;



*/


/*return (
  <div className="homepage">
   {postLists.length ===0 ? <h3> No posts</h3> : postLists.map((post)=>{
    return(
      <div key={post.id} className="card mb-4 shadow-small">

      <div className="card-body">
 {/*        {isAuth && post.author.id ===auth.currentUser.uid &&     
        <div className="d-flex justify-content-end">
         <button className="btn btn-danger my-3 mx-3" onClick={()=>{deletePost(post.id)}}> X </button>
       </div> } *///}    {isAuth && auth.currentUser && post.author.id === auth.currentUser.uid && (    
      /*  <div className="d-flex justify-content-end">
         <button className="btn btn-danger my-3 mx-3" onClick={()=>{deletePost(post.id)}}> X </button>
       </div>) }
        <h5 className="card-title mb-3 fw-bold">{post.title} </h5>
        <p className="card-title mb-3">{post.postContent}</p>
        <span className="badge bg-dark">{post.author.name}</span>

      </div>
    </div>
    )
   }) }
  </div>
)*/