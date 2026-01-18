function BoxCard({ icon, title, data }) {
  return (
    <div className="border border-white py-3 px-4 rounded w-[15%]">
      <div className="flex flex-row gap-4 items-center">
        <span>{icon}</span>
        <p>{title}</p>
      </div>
      <h3 className="text-3xl">{data}</h3>
    </div>
  );
}

export default BoxCard;
