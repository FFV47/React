import LineItem from "./LineItem";

const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items
        .sort((a, b) => b.id - a.id)
        .map((item) => (
          <LineItem
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default ItemList;
