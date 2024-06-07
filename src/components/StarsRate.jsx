const StarsRate = ({ votes }) => {
  const style = () => {
    return { clipPath: `inset(0 ${100 - votes * 10}% 0 0)` };
  };

  return (
    <div
      className="relative aspect-11/2 w-[6.25rem] *:absolute !opacity-100"
      style={{
        filter: "hue-rotate(320deg)",
      }}
    >
      <img src="/stars.webp" aria-hidden="true" />
      <img src="/stars-filled.webp" aria-hidden="true" style={style()} />
    </div>
  );
};

export default StarsRate;