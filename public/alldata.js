function AllData() {
  const [data, setData] = React.useState("");
  const { user } = useAppContext();

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h5> All Data in Store:</h5>
      {JSON.stringify(data)}
    </>
  );
}
