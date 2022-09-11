import UseFetchRewarders from '../../hooks/UseFetchRewarder';

function Rewarders() {
  const rewarders = UseFetchRewarders();

  if (rewarders.loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <>
      {rewarders.rewarders.map((rewarder: any) => {
        return <div key={rewarder.id}>{rewarder.id}</div>;
      })}
    </>
  );
}

export default Rewarders;
