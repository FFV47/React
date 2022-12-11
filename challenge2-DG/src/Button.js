const Button = ({ endpoint, setPath }) => {
  return (
    <button type="button" onClick={() => setPath(endpoint)}>
      {endpoint}
    </button>
  );
};

export default Button;
