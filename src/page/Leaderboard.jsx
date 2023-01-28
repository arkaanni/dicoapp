import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/leaderboard/action';

function Leaderboard() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <h4 className="text-lg">leaderboard pengguna aktif</h4>
      <div className="self-center w-9/12">
        <table className="table table-fixed w-full">
          <thead>
            <tr>
              <th className="lowercase w-4/5">user</th>
              <th className="lowercase w-1/5">skor</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((it) => (
              <tr key={it.user.id}>
                <td>
                  <div className="avatar w-6">
                    <img className="avatar rounded-full mr-4" src={it.user.avatar} alt="" />
                    <p>{it.user.name}</p>
                  </div>
                </td>
                <td>
                  <p>{it.score}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
