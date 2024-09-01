import { useContext } from "react";
import Layout from "../../components/layout";
import Card from "../../components/card";
import ProductDetail from "../../components/productDetail";
import { ShoppingCartContext } from "../../context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.searchByTitle && context.searchByTitle.trim() !== "") {
      if (context.FilterItems && context.FilterItems.length > 0) {
        return context.FilterItems.map((item) => (
          <Card key={item.id} data={item} />
        ));
      } else {
        return <div>We dont have anything</div>;
      }
    } else {
      return context.items?.map((item) => <Card key={item.id} data={item} />);
    }
  };
  

  return (
    <Layout>
      <input
        type="text"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        placeholder="Search Product"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
      Home
    </Layout>
  );
}

export default Home;
