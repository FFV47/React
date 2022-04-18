const TableRow = ({ item }) => {
  const itemData = [];
  const getRows = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object") {
        getRows(value);
      } else {
        itemData.push(<td key={key}>{JSON.stringify(value).replace(/"/g, "")}</td>);
      }
    });
  };

  getRows(item);
  // const itemData = Object.entries(item).map(([key, value]) => (
  //   <td key={key}>{JSON.stringify(value).replace(/"/g, "")}</td>
  // ));

  return <tr>{itemData}</tr>;
};

export default TableRow;
