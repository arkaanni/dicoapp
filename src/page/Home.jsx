import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import ThreadList from '../component/ThreadList';

function Home() {
  const { user, tagList } = useSelector((state) => state);
  const [searchParam, setSearchParam] = useSearchParams();

  const onTagClick = (tag) => {
    setSearchParam({ tag });
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto lg:flex-row">
      <div className="md:w-full lg:w-9/12 rounded-lg shadow">
        <ThreadList tagParam={searchParam.get('tag')} />
      </div>
      <div className="md:w-full lg:w-3/12 flex flex-col gap-4">
        {user != null && (<Link to="/thread/new" className="btn btn-primary lowercase">buat thread</Link>)}
        <div className="card shadow rounded">
          <div className="card-body p-4">
            <p className="font-bold">popular tags</p>
            <ul className="list-none">
              {Object.keys(tagList)?.map((v) => (
                <li
                  className="list-item cursor-pointer"
                  key={v}
                >
                  <button type="button" onClick={() => onTagClick(v)}>
                    #
                    {v}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
