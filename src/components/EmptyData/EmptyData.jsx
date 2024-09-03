const EmptyData = () => {
  return (
    <tr>
      <td colSpan="8" className="text-center">
        <div className="p-[20px] text-[1rem] text-[#555] ">
          <p className="text-primary font-[500]">No data available</p>
        </div>
      </td>
    </tr>
  );
};

export default EmptyData;
