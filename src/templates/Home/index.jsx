import './styles.css';

import { Component } from 'react';


import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 27,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {

    const { postsPerPage, page, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({
      posts,
      page: nextPage
    });
  }

  handleSearch = (e) =>{
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase())  
      }) : posts;

    return (
      <section className="container">

        <input 
          onChange={this.handleSearch} 
          value = {searchValue}
          type="search"/>

        {filteredPosts.length > 0 ? (<Posts posts={filteredPosts} />) : (<p>Não existem posts</p>)}
        

        <div className="button-container">
          <Button
            onclick={this.loadMorePosts}
            text={'Next'}
            disabled={noMorePosts}
          ></Button>
        </div>
      </section>
    );
  }
}

export default Home;
