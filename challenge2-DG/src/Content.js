import TableRow from "./TableRow";

const Content = ({ items }) => {
  const listItems = items.map((item) => <TableRow key={item.id} item={item}></TableRow>);

  return (
    <main className="table-container">
      <table>
        <tbody>{listItems}</tbody>
      </table>
    </main>
  );
};

export default Content;
