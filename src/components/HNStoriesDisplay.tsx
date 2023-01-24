import "./HNStoriesDisplay.css";
import { HNStory } from "../api/HNStory";
import { paginate } from "../lib/pagination";

interface Props {
  stories: HNStory[];
  currentPage: number;
  pageSize: number;
}

export const HNStoriesDisplay = (props: Props) => {
  const { stories, currentPage, pageSize } = props;

  const paginatedPosts = paginate(stories, currentPage, pageSize);

  return (
    <div>
      <ol>
        {paginatedPosts.map((post) => (
          <li key={post.id}>
            <a className="links" href={post.url}>
              {post.title}
            </a>
            <div className="link-info-container">
              <span className="link-info">{post.score} points by </span>
              <a
                target="_blank"
                href={`https://news.ycombinator.com/user?id=${post.by}`}
                rel="noreferrer"
                className="link-info"
              >
                {`${post.by} `}
              </a>
              |
              <a
                target="_blank"
                href={`https://news.ycombinator.com/item?id=${post.id}`}
                rel="noreferrer"
                className="link-info"
              > {`${post.descendants} comments`}</a>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
