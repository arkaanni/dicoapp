import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function ThreadItem({
  isComment = false, title = null, body, owner, upvotes, onUpvote,
}) {
  const user = useSelector((state) => state.user);
  const isUpvoted = upvotes.find((it) => it === user?.id);
  return (
    <div className="card shadow rounded-none w-full bg-white">
      <div className="card-body flex-row p-1">
        <div className="text-center p-4 w-2/12 border-r">
          <div className="avatar w-16">
            <img className="avatar rounded-full" src={owner.avatar} alt="" />
          </div>
          <div>
            <p className="text-xs">{owner.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 w-10/12">
          {!isComment && (<p>{title}</p>)}
          <p className="text-xs">{body}</p>
          <hr />
          <div className="flex gap-2">
            {isUpvoted ? (
              <FaThumbsUp className="hover:cursor-pointer" size={16} onClick={() => onUpvote()} />
            ) : (
              <FaRegThumbsUp className="hover:cursor-pointer" size={16} onClick={() => onUpvote()} />
            )}
            <p className="text-primary-content text-sm">
              {upvotes.length}
              {' '}
              vote(s)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  isComment: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(Object).isRequired,
  upvotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpvote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  isComment: false,
  title: null,
};

export default ThreadItem;
