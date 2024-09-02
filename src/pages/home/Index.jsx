import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout";
import Card from "../../components/card";
import ProductDetail from "../../components/productDetail";
import { ShoppingCartContext } from "../../context";

function Home() {
  const location = useLocation();
  const context = useContext(ShoppingCartContext);

  // Update the category filter when the URL changes
  useEffect(() => {
    const categoryName = decodeURIComponent(location.pathname.split("/").pop());
    context.setSearchByCategory(categoryName);
  }, [location.pathname, context]);

  const renderView = () => {
    const { searchByTitle, searchByCategory, FilterItems, items } = context;

    // Filter items by title and category
    if (searchByTitle && searchByTitle.trim() !== "") {
      if (FilterItems && FilterItems.length > 0) {
        return FilterItems.map((item) => <Card key={item.id} data={item} />);
      } else {
        return <div>We don’t have anything that matches your search</div>;
      }
    } else if (searchByCategory) {
      // Filter by category if specified
      if (FilterItems && FilterItems.length > 0) {
        return FilterItems.map((item) => <Card key={item.id} data={item} />);
      } else {
        return <div>We don’t have anything in this category</div>;
      }
    } else {
      // Show all items if no filters are applied
      return items?.map((item) => <Card key={item.id} data={item} />);
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
