import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2, Gift } from 'lucide-react';

export const RedditButton = ({
  initialVotes = 0,
  commentCount = 0,
  onUpvote,
  onDownvote,
  onComment,
  onShare,
  onAward,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0); // 1 for upvote, -1 for downvote, 0 for none

  const handleUpvote = () => {
    if (userVote === 1) {
      setVotes(votes - 1);
      setUserVote(0);
    } else {
      setVotes(votes + (userVote === -1 ? 2 : 1));
      setUserVote(1);
    }
    onUpvote && onUpvote();
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      setVotes(votes + 1);
      setUserVote(0);
    } else {
      setVotes(votes - (userVote === 1 ? 2 : 1));
      setUserVote(-1);
    }
    onDownvote && onDownvote();
  };

  return (
    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex flex-col items-center">
        <button
          onClick={handleUpvote}
          className={`hover:text-orange-500 ${userVote === 1 ? 'text-orange-500' : ''}`}
        >
          <ArrowUp size={18} />
        </button>
        <span className="font-medium">{votes}</span>
        <button
          onClick={handleDownvote}
          className={`hover:text-blue-500 ${userVote === -1 ? 'text-blue-500' : ''}`}
        >
          <ArrowDown size={18} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onComment} className="flex items-center gap-1 hover:text-primary">
          <MessageSquare size={16} />
          {commentCount}
        </button>
        <button onClick={onShare} className="hover:text-primary">
          <Share2 size={16} />
        </button>
        <button onClick={onAward} className="hover:text-yellow-500">
          <Gift size={16} />
        </button>
      </div>
    </div>
  );
};
