type Page = "Linear Regression" | "K-means" | "Nearest Neighbour";

interface NavbarProps {
  setActivePage: (page: Page) => void;
}

function Navbar({ setActivePage }: NavbarProps) {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
       marginLeft:"0px",
       backgroundColor:'rgba(65,100,100,0.25)',
       marginBottom:'20px',
       padding:10,
    }}>
      <button style={{marginRight:'5px'}}onClick={() => setActivePage("Linear Regression")}>Linear Regression</button>
      <button style={{marginRight:'5px'}}onClick={() => setActivePage("K-means")}>K-means</button>
      <button style={{marginRight:'5px'}}onClick={() => setActivePage("Nearest Neighbour")}>Nearest Neighbour</button>
    </div>
  );
}

export default Navbar;
