type Page = "Linear Regression" | "K-means" | "Nearest Neighbour";

interface NavbarProps {
  setActivePage: (page: Page) => void;
}

function Navbar({ setActivePage }: NavbarProps) {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
       marginLeft:"15px",
       padding:10,
    }}>
      <button onClick={() => setActivePage("Linear Regression")}>Linear Regression</button>
      <button onClick={() => setActivePage("K-means")}>K-means</button>
      <button onClick={() => setActivePage("Nearest Neighbour")}>Nearest Neighbour</button>
    </div>
  );
}

export default Navbar;
