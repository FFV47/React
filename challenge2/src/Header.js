import Button from "./Button";

const Header = ({ setPath }) => {
  const endpoints = ["users", "posts", "comments"];

  return (
    <header>
      {endpoints.map((endpoint) => (
        <Button key={endpoint} endpoint={endpoint} setPath={setPath}></Button>
      ))}
    </header>
  );
};

export default Header;
