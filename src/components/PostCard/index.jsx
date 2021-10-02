import './styles.css'


export const PostCard = ({ post }) => {
    
    return (
        <div className="post">
            <img src={post.cover} alt={post.title} />
            <div className="post-content">
                <p><b>{post.title} {post.id}</b></p>
                <p>{post.body}</p>
            </div>
        </div>
    );
}