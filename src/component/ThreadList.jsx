import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineComment, AiOutlineClockCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

function ThreadList({ tagParam }) {
  const { threadList, userList } = useSelector((state) => state);

  const threads = tagParam === null ? threadList
    : threadList.filter((it) => it.category === tagParam);

  return (
    <div className="container mx-auto text-xs">
      <table className="table table-fixed w-full rounded">
        <thead>
          <tr>
            <th className="w-8/12 lowercase">thread</th>
            <th className="w-1/12">
              <div className="flex justify-center">
                <AiOutlineComment size={24} />
              </div>
            </th>
            <th className="w-2/12">
              <div className="flex justify-center">
                <AiOutlineClockCircle size={24} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {threads.map((it) => {
            const owner = userList.find((u) => u.id === it.ownerId);
            return (
              <tr key={it.id}>
                <td>
                  <div className="flex flex-col gap-3 whitespace-pre-line">
                    <p className="font-semibold">
                      <Link to={`/thread/${it.id}`}>{it.title}</Link>
                      <span className="badge badge-xs ml-2">{it.category}</span>
                    </p>
                    <p className="truncate text-xs">{it.body}</p>
                    <div className="flex gap-1">
                      <small>by</small>
                      <small><strong>{owner?.name}</strong></small>
                      <img src={owner?.avatar} alt="" className="avatar rounded-full" width="24" />
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <p>{it.totalComments}</p>
                </td>
                <td className="text-center">
                  <p>{new Date(it.createdAt).toDateString()}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ThreadList.defaultProps = {
  tagParam: null,
};

ThreadList.propTypes = {
  tagParam: PropTypes.string,
};

export default ThreadList;
